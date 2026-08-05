import { supabase } from "@/lib/supabase";

export async function uploadResume(
  userId: string,
  file: File
) {
  const path = `${userId}/resume.pdf`;

  const { error } = await supabase.storage
    .from("resume")
    .upload(path, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("resume")
    .getPublicUrl(path);

  return data.publicUrl;
}