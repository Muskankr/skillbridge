"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getProjects } from "@/features/projects/services/project.service";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string | null;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  created_at: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await getProjects(user.id);

    setProjects(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    refreshProjects: loadProjects,
  };
}