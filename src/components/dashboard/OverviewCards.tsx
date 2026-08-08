"use client";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import {
  FolderKanban,
  Award,
  Trophy,
  Code2,
} from "lucide-react";

export default function OverviewCards() {
  const { data, loading } = useDashboard();

  const cards = [
    {
      title: "Projects",
      value: data.projects,
      icon: FolderKanban,
    },
    {
      title: "Certificates",
      value: data.certificates,
      icon: Award,
    },
    {
      title: "Achievements",
      value: data.achievements,
      icon: Trophy,
    },
    {
      title: "Skills",
      value: 0,
      icon: Code2,
    },
  ];

  if (loading) {
    return (
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="h-32 animate-pulse rounded-2xl border border-[#242424] bg-[#050505]"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-[#242424] bg-[#050505] p-6 transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#0a0a0a]"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500">
                {card.title}
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2d2d2d] bg-[#0a0a0a] text-zinc-400 transition group-hover:border-[#444] group-hover:text-white">
                <Icon size={18} />
              </div>
            </div>

            {/* Value */}
            <div className="mt-6">
              <h2 className="text-4xl font-bold tracking-tight text-white">
                {card.value}
              </h2>

              <p className="mt-2 text-xs text-zinc-600">
                {card.title === "Projects" &&
                  "Projects you've added"}

                {card.title === "Certificates" &&
                  "Certificates you've earned"}

                {card.title === "Achievements" &&
                  "Achievements unlocked"}

                {card.title === "Skills" &&
                  "Skills in your profile"}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}