import { supabase } from "@/lib/supabase";

export async function createProject(project: any) {
  return await supabase
    .from("projects")
    .insert(project);
}

export async function updateProject(
  id: string,
  project: any
) {
  return await supabase
    .from("projects")
    .update(project)
    .eq("id", id);
}

export async function deleteProject(id: string) {
  return await supabase
    .from("projects")
    .delete()
    .eq("id", id);
}

export async function getProjects(userId: string) {
  return await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}