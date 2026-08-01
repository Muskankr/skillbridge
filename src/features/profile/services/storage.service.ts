import { supabase } from "@/lib/supabase";

export async function uploadAvatar(
  userId: string,
  file: File
) {
  const extension = file.name.split(".").pop();

  const filePath = `${userId}.${extension}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) return { error };

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return {
    publicUrl: data.publicUrl,
  };
}