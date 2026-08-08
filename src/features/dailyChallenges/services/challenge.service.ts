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
  challenge: {
    id: string;
  }
) {
  // Check whether already completed
  const { data: existing, error: checkError } = await supabase
    .from("user_challenges")
    .select("id")
    .eq("user_id", userId)
    .eq("challenge_id", challenge.id)
    .maybeSingle();

  if (checkError) {
    console.error("Challenge check error:", checkError);

    return {
      success: false,
      completed: false,
      error: checkError,
    };
  }

  // Already completed
  if (existing) {
    return {
      success: true,
      completed: false,
      error: null,
    };
  }

  // Record completion
  const { error: insertError } = await supabase
    .from("user_challenges")
    .insert({
      user_id: userId,
      challenge_id: challenge.id,
      completed: true,
      completed_at: new Date().toISOString(),
    });

  if (insertError) {
    console.error(
      "Challenge completion error:",
      insertError
    );

    return {
      success: false,
      completed: false,
      error: insertError,
    };
  }

  // XP amount comes from the database,
  // not from the client.
  const xpResult = await awardXP(
    userId,
    `challenge-${challenge.id}`
  );

  if (!xpResult.success) {
    console.error(
      "Challenge XP error:",
      xpResult.error
    );

    return {
      success: true,
      completed: true,
      error: xpResult.error,
    };
  }

  return {
    success: true,
    completed: true,
    error: null,
  };
}