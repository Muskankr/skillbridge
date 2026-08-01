import { supabase } from "@/lib/supabase";

export async function getProfile(userId: string) {
  return await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
}

export async function createProfile(user: {
  id: string;
  email?: string;
}) {
  return await supabase.from("profiles").insert({
    id: user.id,
    full_name: "",
    username: user.email?.split("@")[0] || "",
    bio: "",
    college: "",
    branch: "",
    graduation_year: null,
    avatar_url: "",
    career_score: 0,
    xp: 0,
    streak: 0,
  });
}

export async function updateProfile(
  userId: string,
  profile: Record<string, unknown>
) {
  return await supabase
    .from("profiles")
    .update(profile)
    .eq("id", userId);
}

/* ===========================
   Upload Avatar
=========================== */

export async function uploadAvatar(
  userId: string,
  file: File
): Promise<string> {
  const fileExt = file.name.split(".").pop();

  const fileName = `${userId}.${fileExt}`;

  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return publicUrl;
}