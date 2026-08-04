import { supabase } from "@/lib/supabase";

export async function getSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  // Create default settings if none exist
  if (!data) {
    const { data: inserted, error: insertError } = await supabase
      .from("user_settings")
      .insert({
        user_id: userId,
      })
      .select()
      .single();

    if (insertError) {
      console.error(insertError);
      return null;
    }

    return inserted;
  }

  return data;
}

export async function updateSettings(
  userId: string,
  values: Record<string, unknown>
) {
  const { error } = await supabase
    .from("user_settings")
    .update(values)
    .eq("user_id", userId);

  if (error) {
    console.error(error);
  }
}