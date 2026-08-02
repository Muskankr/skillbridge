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

export default function GithubCard({ githubUrl }: Props) {
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

    setGithub(profile);
    setRepos(repoData);
  }

  if (!github) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">
      <div className="flex items-center gap-6">
        <img
          src={github.avatar_url}
          alt={github.login}
          className="h-24 w-24 rounded-full"
        />

        <div>
          <div className="flex items-center gap-2">
            <FaGithub size={22} />

            <h2 className="text-2xl font-bold text-white">
              {github.name || github.login}
            </h2>
          </div>

          <p className="text-slate-400">@{github.login}</p>

          <p className="mt-2 text-slate-300">
            {github.bio}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-slate-800 p-4 text-center">
          <p className="text-slate-400">Repos</p>
          <h2 className="text-2xl font-bold text-indigo-400">
            {github.public_repos}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 text-center">
          <p className="text-slate-400">Followers</p>
          <h2 className="text-2xl font-bold text-green-400">
            {github.followers}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 text-center">
          <p className="text-slate-400">Following</p>
          <h2 className="text-2xl font-bold text-pink-400">
            {github.following}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 text-center">
          <p className="text-slate-400">Top Repos</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {repos.length}
          </h2>
        </div>
      </div>
    </section>
  );
}