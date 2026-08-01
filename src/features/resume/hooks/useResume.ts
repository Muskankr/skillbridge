"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getResumeData } from "../services/resume.service";

export function useResume() {

  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data = await getResumeData(user.id);

      setResume(data);
      setLoading(false);
    }

    load();

  }, []);

  return {
    resume,
    loading,
  };
}