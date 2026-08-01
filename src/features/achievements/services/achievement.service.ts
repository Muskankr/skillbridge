import { supabase } from "@/lib/supabase";

export async function getAchievements(userId: string) {
  return await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function addAchievement(data: {
  user_id: string;
  title: string;
  organization: string;
  description: string;
  achievement_date: string;
  proof_url: string;
  image_url: string;
  badge: string;
}) {
  return await supabase
    .from("achievements")
    .insert(data);
}

export async function deleteAchievement(id: string) {
  return await supabase
    .from("achievements")
    .delete()
    .eq("id", id);
}