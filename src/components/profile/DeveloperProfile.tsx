"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Profile {
  full_name: string | null;
  username: string | null;
  headline: string | null;
  bio: string | null;
  college: string | null;
  branch: string | null;
  graduation_year: number | null;
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  location: string | null;
  avatar_url: string | null;
  career_score: number | null;
  profile_completion: number | null;
  xp: number | null;
  level: number | null;
}

export default function DeveloperProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to load profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Profile loading failed:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900">
        <p className="text-slate-400">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">
          Profile not found.
        </p>
      </div>
    );
  }

  const initial =
    profile.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="space-y-6">
      {/* Profile Hero */}
      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-500 bg-indigo-600">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-5xl font-black text-white">
                {initial}
              </span>
            )}
          </div>

          {/* Name */}
          <h2 className="mt-6 text-3xl font-black text-white">
            {profile.full_name || "Developer"}
          </h2>

          {/* Username */}
          <p className="mt-2 text-lg font-medium text-indigo-400">
            @{profile.username || "username"}
          </p>

          {/* Headline */}
          <p className="mt-3 max-w-md text-slate-300">
            {profile.headline ||
              "Add a headline to introduce yourself."}
          </p>

          {profile.location && (
            <p className="mt-3 text-sm text-slate-500">
              📍 {profile.location}
            </p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3">
        <StatCard
          title="Career Score"
          value={profile.career_score ?? 0}
          color="text-indigo-400"
        />

        <StatCard
          title="Profile Completion"
          value={`${profile.profile_completion ?? 0}%`}
          color="text-green-400"
        />

        <StatCard
          title="XP"
          value={profile.xp ?? 0}
          color="text-yellow-400"
        />

        <StatCard
          title="Level"
          value={profile.level ?? 1}
          color="text-pink-400"
        />
      </section>

      {/* About */}
      <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
        <h2 className="text-xl font-bold text-white">
          About
        </h2>

        <p className="mt-4 leading-7 text-slate-300">
          {profile.bio || "No bio added yet."}
        </p>
      </section>

      {/* Education */}
      <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
        <h2 className="text-xl font-bold text-white">
          Education
        </h2>

        <div className="mt-5 space-y-4 text-sm">
          <InfoRow
            label="College"
            value={profile.college}
          />

          <InfoRow
            label="Branch"
            value={profile.branch}
          />

          <InfoRow
            label="Graduation"
            value={
              profile.graduation_year
                ? String(profile.graduation_year)
                : null
            }
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-3xl border border-white/10 bg-slate-900 p-7">
        <h2 className="text-xl font-bold text-white">
          Social Links
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              GitHub
            </a>
          )}

          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              LinkedIn
            </a>
          )}

          {profile.portfolio_url && (
            <a
              href={profile.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Portfolio
            </a>
          )}

          {!profile.github_url &&
            !profile.linkedin_url &&
            !profile.portfolio_url && (
              <p className="text-sm text-slate-500">
                Add your social links to showcase your work.
              </p>
            )}
        </div>
      </section>
    </div>
  );
}

/* ----------------------------- */
/* Small Components */
/* ----------------------------- */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3
        className={`mt-2 text-3xl font-black ${color}`}
      >
        {value}
      </h3>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-slate-200">
        {value || "-"}
      </p>
    </div>
  );
}