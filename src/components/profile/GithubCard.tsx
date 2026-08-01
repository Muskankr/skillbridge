"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  getGithubProfile,
  getGithubRepos,
} from "@/features/github/services/github.service";

interface Props {
  githubUrl?: string;
}

export default function GithubCard({
  githubUrl,
}: Props) {
  const [github, setGithub] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    if (!githubUrl) return;

    const username = githubUrl
      .split("/")
      .filter(Boolean)
      .pop();

    if (!username) return;

    load(username);
  }, [githubUrl]);

  async function load(username: string) {
    const profile = await getGithubProfile(username);
    const repoData = await getGithubRepos(username);

    if (profile) {
      setGithub(profile);
    }

    setRepos(repoData || []);
  }

  if (!github) return null;

  return (
    <section className="space-y-8">

      {/* GitHub Profile */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <div className="flex flex-col items-center gap-6 md:flex-row">

          <img
            src={github.avatar_url}
            alt={github.login}
            className="h-24 w-24 rounded-full border-4 border-indigo-500"
          />

          <div>

            <div className="flex items-center gap-3">

              <FaGithub
                size={28}
                className="text-white"
              />

              <h2 className="text-3xl font-black text-white">
                {github.name || github.login}
              </h2>

            </div>

            <p className="mt-2 text-indigo-400">
              @{github.login}
            </p>

            <p className="mt-4 max-w-2xl text-slate-300">
              {github.bio || "No bio available."}
            </p>

          </div>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl bg-slate-800 p-5 text-center">

            <p className="text-slate-400">
              Repositories
            </p>

            <h2 className="mt-2 text-3xl font-black text-indigo-400">
              {github.public_repos}
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-800 p-5 text-center">

            <p className="text-slate-400">
              Followers
            </p>

            <h2 className="mt-2 text-3xl font-black text-green-400">
              {github.followers}
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-800 p-5 text-center">

            <p className="text-slate-400">
              Following
            </p>

            <h2 className="mt-2 text-3xl font-black text-pink-400">
              {github.following}
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-800 p-5 text-center">

            <p className="text-slate-400">
              Location
            </p>

            <h2 className="mt-2 text-xl font-bold text-yellow-400">
              {github.location || "-"}
            </h2>

          </div>

        </div>

      </div>

      {/* Latest GitHub Repositories */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-8 text-3xl font-black text-white">
          Latest GitHub Repositories
        </h2>

        {repos.length === 0 ? (

          <p className="text-slate-400">
            No repositories found.
          </p>

        ) : (

          <div className="grid gap-6 md:grid-cols-2">

            {repos.map((repo) => (

              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-slate-800 p-6 transition duration-300 hover:scale-[1.02] hover:border-indigo-500"
              >

                <h3 className="text-xl font-bold text-white">
                  {repo.name}
                </h3>

                <p className="mt-3 text-sm text-slate-400">
                  {repo.description || "No description available."}
                </p>

                <div className="mt-5 flex flex-wrap gap-5 text-sm">

                  <span className="text-yellow-400">
                    ⭐ {repo.stargazers_count}
                  </span>

                  <span className="text-pink-400">
                    🍴 {repo.forks_count}
                  </span>

                  <span className="text-indigo-400">
                    💻 {repo.language || "Unknown"}
                  </span>

                </div>

                <p className="mt-5 text-xs text-slate-500">
                  Updated:{" "}
                  {new Date(
                    repo.updated_at
                  ).toLocaleDateString()}
                </p>

              </a>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}