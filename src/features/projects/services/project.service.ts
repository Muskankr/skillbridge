import { supabase } from "@/lib/supabase";

export interface ProjectInput {
  user_id?: string;
  title: string;
  description: string;
  tech_stack: string;
  github_url?: string;
  live_url?: string;
}

export async function createProject(
  project: ProjectInput
) {
  const cleanedProject = {
    ...project,
    title: project.title.trim(),
    description: project.description.trim(),
    tech_stack: project.tech_stack.trim(),
    github_url:
      project.github_url?.trim() || null,
    live_url:
      project.live_url?.trim() || null,
  };

  if (!cleanedProject.title) {
    return {
      data: null,
      error: new Error(
        "Project title is required."
      ),
    };
  }

  if (!cleanedProject.description) {
    return {
      data: null,
      error: new Error(
        "Project description is required."
      ),
    };
  }

  if (!cleanedProject.tech_stack) {
    return {
      data: null,
      error: new Error(
        "Tech stack is required."
      ),
    };
  }

  return await supabase
    .from("projects")
    .insert(cleanedProject)
    .select()
    .single();
}

export async function updateProject(
  id: string,
  project: Omit<ProjectInput, "user_id">
) {
  const cleanedProject = {
    title: project.title.trim(),
    description: project.description.trim(),
    tech_stack: project.tech_stack.trim(),
    github_url:
      project.github_url?.trim() || null,
    live_url:
      project.live_url?.trim() || null,
  };

  if (!cleanedProject.title) {
    return {
      data: null,
      error: new Error(
        "Project title is required."
      ),
    };
  }

  if (!cleanedProject.description) {
    return {
      data: null,
      error: new Error(
        "Project description is required."
      ),
    };
  }

  if (!cleanedProject.tech_stack) {
    return {
      data: null,
      error: new Error(
        "Tech stack is required."
      ),
    };
  }

  return await supabase
    .from("projects")
    .update(cleanedProject)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteProject(
  id: string
) {
  return await supabase
    .from("projects")
    .delete()
    .eq("id", id);
}

export async function getProjects(
  userId: string
) {
  return await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}