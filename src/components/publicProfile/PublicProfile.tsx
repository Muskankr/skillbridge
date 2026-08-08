"use client";

import { useEffect, useState } from "react";

import { getPublicProfile } from "@/features/publicProfile/services/publicProfile.service";

import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import SocialLinks from "./SocialLinks";
import ProjectsSection from "./ProjectsSection";
import CertificatesSection from "./CertificatesSection";
import AchievementsSection from "./AchievementsSection";

interface ProfileData {
  id: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  level?: number;
  streak?: number;
  career_score?: number;
  profile_completion?: number;
  xp?: number;
  show_streak?: boolean;
}

interface PublicProfileData {
  private: boolean;
  profile: ProfileData | null;
}

export default function PublicProfile({
  username,
}: {
  username: string;
}) {
  const [data, setData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);

      const { data, error } = await getPublicProfile(username);

      if (error) {
        console.error("Failed to load profile:", error);
        setData(null);
      } else {
        setData(data);
      }

      setLoading(false);
    }

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">Loading profile...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">Profile not found.</p>
      </div>
    );
  }

  if (data.private) {
    return (
      <div className="flex min-h-[500px] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-3xl">
            🔒
          </div>

          <h1 className="text-2xl font-bold text-white">
            Private Profile
          </h1>

          <p className="mt-3 text-slate-400">
            This developer has chosen to keep their profile private.
          </p>
        </div>
      </div>
    );
  }

  if (!data.profile) {
    return null;
  }

  const profile = data.profile;

  return (
    <div>
      <HeroSection profile={profile} />

      <SocialLinks profile={profile} />

      <SkillsSection profile={profile} />

      <ProjectsSection />

      <CertificatesSection />

      <AchievementsSection />
    </div>
  );
}