import { supabase } from "@/lib/supabase";

const BUCKET = "resume";

/* ===========================
   Upload Resume
=========================== */

export async function uploadResume(
  userId: string,
  file: File
) {
  const extension = file.name.split(".").pop();

  const fileName = `${userId}/${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  const { data, error } = await supabase
    .from("resume_reviews")
    .insert({
      user_id: userId,
      resume_url: publicUrl,
      file_name: file.name,
      status: "uploaded",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/* ===========================
   Get Latest Resume
=========================== */

export async function getResume(
  userId: string
) {
  const { data, error } = await supabase
    .from("resume_reviews")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

/* ===========================
   Replace Resume
=========================== */

export async function replaceResume(
  resumeId: string,
  userId: string,
  file: File
) {
  const extension = file.name.split(".").pop();

  const fileName = `${userId}/${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  const { data, error } = await supabase
    .from("resume_reviews")
    .update({
      resume_url: publicUrl,
      file_name: file.name,
      uploaded_at: new Date().toISOString(),
      status: "uploaded",
    })
    .eq("id", resumeId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/* ===========================
   Delete Resume
=========================== */

export async function deleteResume(
  resumeId: string
) {
  const { error } = await supabase
    .from("resume_reviews")
    .delete()
    .eq("id", resumeId);

  if (error) {
    throw error;
  }

  return true;
}