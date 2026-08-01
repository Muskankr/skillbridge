"use client";

import { useEffect, useState } from "react";
import { getPublicProfile } from "@/features/publicProfile/services/publicProfile.service";

import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import SocialLinks from "./SocialLinks";

import ProjectsSection from "./ProjectsSection";
import CertificatesSection from "./CertificatesSection";
import AchievementsSection from "./AchievementsSection";

export default function PublicProfile({
  username,
}: {
  username: string;
}) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } =
        await getPublicProfile(username);

      setProfile(data);
    }

    load();
  }, [username]);

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading Profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10">

  <div className="mx-auto max-w-6xl space-y-8">

    <HeroSection profile={profile} />

    <SocialLinks profile={profile} />

    <SkillsSection profile={profile} />

    <ProjectsSection />

    <CertificatesSection />

    <AchievementsSection />

  </div>

</main>
  );
}