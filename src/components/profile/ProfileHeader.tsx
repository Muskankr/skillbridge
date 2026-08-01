"use client";

import { UserCircle } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600">

          <UserCircle className="h-20 w-20 text-white" />

        </div>

        <div className="flex-1">

          <h1 className="text-4xl font-black">
            Your Developer Profile
          </h1>

          <p className="mt-3 text-slate-400 max-w-2xl">
            Showcase projects, certificates, achievements,
            coding profiles and everything recruiters want to see.
          </p>

        </div>

      </div>

    </section>
  );
}