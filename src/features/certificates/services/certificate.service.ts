import { supabase } from "@/lib/supabase";

export async function getCertificates(userId: string) {
  return await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function addCertificate(data: {
  user_id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  description: string;
}) {
  return await supabase
    .from("certificates")
    .insert(data);
}
export async function deleteCertificate(id: string) {
  return await supabase
    .from("certificates")
    .delete()
    .eq("id", id);
}