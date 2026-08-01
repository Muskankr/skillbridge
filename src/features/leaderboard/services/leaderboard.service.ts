import { supabase } from "@/lib/supabase";

export async function getLeaderboard() {
  return await supabase
    .from("leaderboard")
    .select("*")
    .order("xp", {
      ascending: false,
    });
}