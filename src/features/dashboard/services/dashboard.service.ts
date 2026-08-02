import { supabase } from "@/lib/supabase";

export interface DashboardStats {
  profile: any;
  totalXP: number;
  projectCount: number;
  certificateCount: number;
  achievementCount: number;
  careerScore: number;
  profileCompletion: number;
}

export async function getDashboardStats(
  userId: string
): Promise<DashboardStats> {
  const [
    profileResult,
    projectsResult,
    certificatesResult,
    achievementsResult,
    xpHistoryResult,
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

  const xpRows = (xpHistoryResult.data ?? []) as { points: number }[];

  const totalXP = xpRows.reduce(
    (sum, row) => sum + (row.points ?? 0),
    0
  );

  return {
    profile: profileResult.data,

    totalXP,

    projectCount: projectsResult.count ?? 0,

    certificateCount: certificatesResult.count ?? 0,

    achievementCount: achievementsResult.count ?? 0,

    careerScore: profileResult.data?.career_score ?? 0,

    profileCompletion:
      profileResult.data?.profile_completion ?? 0,
  };
}