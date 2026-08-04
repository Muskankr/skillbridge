import { supabase } from "@/lib/supabase";

export async function getStreak(userId: string) {
  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  console.log("GET STREAK:", data, error);

  return data;
}

export async function updateStreak(userId: string) {
  const today = new Date().toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayString = yesterday.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  console.log("Existing streak:", data);
  console.log("Select error:", error);

  if (!data) {
    const { error: insertError } = await supabase
      .from("user_streaks")
      .insert({
        user_id: userId,
        streak: 1,
        longest_streak: 1,
        last_login: today,
      });

    console.log("Insert error:", insertError);

    return;
  }

  if (data.last_login === today) return;

  let streak = 1;

  if (data.last_login === yesterdayString) {
    streak = data.streak + 1;
  }

  const { error: updateError } = await supabase
    .from("user_streaks")
    .update({
      streak,
      longest_streak: Math.max(streak, data.longest_streak),
      last_login: today,
    })
    .eq("user_id", userId);

  console.log("Update error:", updateError);
}