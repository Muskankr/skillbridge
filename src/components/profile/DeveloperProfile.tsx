"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Profile {
  full_name: string;
  username: string;
  headline: string;
  bio: string;
  college: string;
  branch: string;
  graduation_year: number;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  location: string;
  career_score: number;
  profile_completion: number;
  xp: number;
  level: number;
}

export default function DeveloperProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

    if (data) {
      setProfile(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-10 text-center text-white">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-10 text-center text-white">
        Profile not found.
      </div>
    );
  }

  return (
    <main className="space-y-8">

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-10">

        <div className="flex flex-col items-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-5xl font-black text-white">
            {profile.full_name
              ? profile.full_name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h1 className="mt-6 text-4xl font-black text-white">
            {profile.full_name || "Developer"}
          </h1>

          <p className="mt-2 text-lg text-indigo-400">
            @{profile.username}
          </p>

          <p className="mt-3 text-slate-300">
            {profile.headline}
          </p>

        </div>

      </section>

      <section className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6 text-center">
          <p className="text-slate-400">Career Score</p>
          <h2 className="mt-3 text-4xl font-black text-indigo-400">
            {profile.career_score ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">
          <p className="text-slate-400">Profile Completion</p>
          <h2 className="mt-3 text-4xl font-black text-green-400">
            {profile.profile_completion ?? 0}%
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">
          <p className="text-slate-400">XP</p>
          <h2 className="mt-3 text-4xl font-black text-yellow-400">
            {profile.xp ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">
          <p className="text-slate-400">Level</p>
          <h2 className="mt-3 text-4xl font-black text-pink-400">
            {profile.level ?? 1}
          </h2>
        </div>

      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          About
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          {profile.bio || "No bio added yet."}
        </p>

      </section>

      <section className="grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="text-xl font-bold text-white">
            Education
          </h2>

          <div className="mt-5 space-y-3 text-slate-300">

            <p>
              <strong>College:</strong> {profile.college || "-"}
            </p>

            <p>
              <strong>Branch:</strong> {profile.branch || "-"}
            </p>

            <p>
              <strong>Graduation:</strong>{" "}
              {profile.graduation_year || "-"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {profile.location || "-"}
            </p>

          </div>

        </div>

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="text-xl font-bold text-white">
            Social Links
          </h2>

          <div className="mt-5 flex flex-col gap-4">

            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                className="rounded-xl bg-slate-800 px-5 py-3 hover:bg-indigo-600"
              >
                GitHub
              </a>
            )}

            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                className="rounded-xl bg-slate-800 px-5 py-3 hover:bg-indigo-600"
              >
                LinkedIn
              </a>
            )}

            {profile.portfolio_url && (
              <a
                href={profile.portfolio_url}
                target="_blank"
                className="rounded-xl bg-slate-800 px-5 py-3 hover:bg-indigo-600"
              >
                Portfolio
              </a>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}