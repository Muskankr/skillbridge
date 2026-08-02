import { supabase } from "@/lib/supabase";
import { awardXP } from "@/features/xp/services/xp.service";

export async function getDailyChallenges() {
  return await supabase
    .from("daily_challenges")
    .select("*")
    .eq("active", true)
    .order("xp", { ascending: false });
}

export async function getUserChallenges(userId: string) {
  return await supabase
    .from("user_challenges")
    .select("*")
    .eq("user_id", userId);
}

export async function completeChallenge(
  userId: string,
  challenge: any
) {
  const { data: existing } = await supabase
    .from("user_challenges")
    .select("id")
    .eq("user_id", userId)
    .eq("challenge_id", challenge.id)
    .maybeSingle();

  if (existing) {
    return false;
  }

  await supabase
    .from("user_challenges")
    .insert({
      user_id: userId,
      challenge_id: challenge.id,
      completed: true,
      completed_at: new Date().toISOString(),
    });

  await awardXP(
    userId,
    challenge.xp,
    `challenge-${challenge.id}`
  );

  return true;
}