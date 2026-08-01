import { supabase } from "@/lib/supabase";

export async function uploadAvatar(
  userId: string,
  file: File
) {
  const extension = file.name.split(".").pop();

  const fileName = `${userId}.${extension}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) return { error };

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return { publicUrl };
}