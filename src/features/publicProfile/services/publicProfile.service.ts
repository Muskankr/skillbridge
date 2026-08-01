import { supabase } from "@/lib/supabase";

export async function getPublicProfile(username: string) {
  return await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();
}