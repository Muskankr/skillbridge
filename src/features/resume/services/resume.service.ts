import { supabase } from "@/lib/supabase";

export async function getResumeData(userId: string) {
  const [
    profile,
    projects,
    certificates,
    achievements,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single(),

    supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId),

    supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId),

    supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId),
  ]);

  return {
    profile: profile.data,
    projects: projects.data || [],
    certificates: certificates.data || [],
    achievements: achievements.data || [],
  };
}