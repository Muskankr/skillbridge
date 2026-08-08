"use client";

import { User } from "lucide-react";

export default function AccountOverview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-8">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <User className="h-5 w-5 text-zinc-300" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Account Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Manage your SkillBridge account and preferences.
            </p>
          </div>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white px-6 py-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Current Plan
          </p>

          <p className="mt-1 text-2xl font-black text-black">
            Free
          </p>
        </div>

      </div>
    </div>
  );
}