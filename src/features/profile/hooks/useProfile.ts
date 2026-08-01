"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;

  full_name: string | null;
  username: string | null;
  headline: string | null;

  bio: string | null;

  college: string | null;
  branch: string | null;

  graduation_year: number | null;

  avatar_url: string | null;

  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;

  location: string | null;

  profile_completion: number;

  career_score: number;

  xp: number;
  streak: number;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, []);

  return {
    profile,
    loading,
  };
}