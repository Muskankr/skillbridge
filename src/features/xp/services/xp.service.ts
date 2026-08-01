import { supabase } from "@/lib/supabase";

export async function awardXP(
  userId: string,
  points: number,
  reason: string
) {
  // Prevent duplicate XP for the same reason
  const { data: existing } = await supabase
    .from("xp_history")
    .select("id")
    .eq("user_id", userId)
    .eq("reason", reason)
    .maybeSingle();

  if (existing) return;

  await supabase.from("xp_history").insert({
    user_id: userId,
    points,
    reason,
  });
}