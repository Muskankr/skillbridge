import { supabase } from "@/lib/supabase";

export async function getSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error loading settings:", error);
    return null;
  }

  return data;
}

export async function updateSettings(
  userId: string,
  settings: Record<string, any>
) {
  const { data, error } = await supabase
    .from("user_settings")
    .update(settings)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating settings:", error);
    throw error;
  }

  return data;
}