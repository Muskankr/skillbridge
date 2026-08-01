"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GithubCard from "./GithubCard";

interface Props {
  username: string;
}

export default function PublicDeveloperProfile({
  username,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (!profileData) {
      setLoading(false);
      return;
    }

    setProfile(profileData);

    const { data: projectData } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", profileData.id)
      .order("created_at", { ascending: false });

    setProjects(projectData || []);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        User not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl space-y-8">

      {/* Hero */}

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-10">

        <div className="flex flex-col items-center">

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-indigo-600 text-5xl font-black text-white">
            {profile.full_name
              ? profile.full_name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h1 className="mt-6 text-4xl font-black text-white">
            {profile.full_name}
          </h1>

          <p className="mt-2 text-xl text-indigo-400">
            @{profile.username}
          </p>

          <p className="mt-4 text-center text-slate-300">
            {profile.headline}
          </p>

        </div>

      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Career Score
          </p>

          <h2 className="mt-3 text-4xl font-black text-indigo-400">
            {profile.career_score || 0}
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Profile Completion
          </p>

          <h2 className="mt-3 text-4xl font-black text-green-400">
            {profile.profile_completion || 0}%
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            XP
          </p>

          <h2 className="mt-3 text-4xl font-black text-yellow-400">
            {profile.xp || 0}
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Level
          </p>

          <h2 className="mt-3 text-4xl font-black text-pink-400">
            {profile.level || 1}
          </h2>

        </div>

      </section>

      {/* About */}

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="text-3xl font-bold text-white">
          About
        </h2>

        <p className="mt-6 leading-8 text-slate-300">
          {profile.bio || "No bio added."}
        </p>

      </section>

      {/* Education */}

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="text-3xl font-bold text-white">
          Education
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <p>
            <span className="font-semibold text-white">
              College:
            </span>{" "}
            {profile.college}
          </p>

          <p>
            <span className="font-semibold text-white">
              Branch:
            </span>{" "}
            {profile.branch}
          </p>

          <p>
            <span className="font-semibold text-white">
              Graduation:
            </span>{" "}
            {profile.graduation_year}
          </p>

          <p>
            <span className="font-semibold text-white">
              Location:
            </span>{" "}
            {profile.location}
          </p>

        </div>

      </section>

      <GithubCard githubUrl={profile.github_url} />

      {/* Projects */}

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-8 text-3xl font-bold text-white">
          Projects
        </h2>

        {projects.length === 0 ? (

          <p className="text-slate-400">
            No projects added yet.
          </p>

        ) : (

          <div className="grid gap-6 md:grid-cols-2">

            {projects.map((project) => (

              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-slate-800 p-6"
              >

                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-4 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {project.tech_stack
                    ?.split(",")
                    .map((tech: string) => (

                      <span
                        key={tech}
                        className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm"
                      >
                        {tech.trim()}
                      </span>

                    ))}

                </div>

                <div className="mt-6 flex gap-4">

                  {project.github_url && (

                    <a
                      href={project.github_url}
                      target="_blank"
                      className="rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500"
                    >
                      GitHub
                    </a>

                  )}

                  {project.live_url && (

                    <a
                      href={project.live_url}
                      target="_blank"
                      className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-500"
                    >
                      Live Demo
                    </a>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* Social Links */}

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="text-3xl font-bold text-white">
          Links
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">

          {profile.github_url && (

            <a
              href={profile.github_url}
              target="_blank"
              className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-indigo-600"
            >
              GitHub
            </a>

          )}

          {profile.linkedin_url && (

            <a
              href={profile.linkedin_url}
              target="_blank"
              className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-indigo-600"
            >
              LinkedIn
            </a>

          )}

          {profile.portfolio_url && (

            <a
              href={profile.portfolio_url}
              target="_blank"
              className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-indigo-600"
            >
              Portfolio
            </a>

          )}

        </div>

      </section>

    </main>
  );
}