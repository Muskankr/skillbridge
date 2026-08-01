import { supabase } from "@/lib/supabase";

export async function getDashboardStats(userId: string) {
  const [
    profile,
    projects,
    certificates,
    achievements,
    xpHistory,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single(),

    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),

    supabase
      .from("certificates")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),

    supabase
      .from("achievements")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),

    supabase
      .from("xp_history")
      .select("points")
      .eq("user_id", userId),
  ]);

  const xp =
    xpHistory.data?.reduce(
      (sum, item) => sum + (item.points || 0),
      0
    ) || 0;

  const level = Math.floor(xp / 100) + 1;

  return {
    projects: projects.count || 0,

    certificates: certificates.count || 0,

    achievements: achievements.count || 0,

    xp,

    level,

    careerScore:
      profile.data?.career_score || 0,

    profileCompletion:
      profile.data?.profile_completion || 0,
  };
}