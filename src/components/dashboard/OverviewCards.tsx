"use client";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function OverviewCards() {
  const { data, loading } = useDashboard();

  const cards = [
    {
      title: "Projects",
      value: data.projects,
      color: "text-blue-400",
    },
    {
      title: "Certificates",
      value: data.certificates,
      color: "text-green-400",
    },
    {
      title: "Achievements",
      value: data.achievements,
      color: "text-purple-400",
    },
    {
      title: "Skills",
      value: 0,
      color: "text-pink-400",
    },
  ];

  if (loading) {
    return (
      <div className="text-center text-slate-400">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
        >
          <p className="text-slate-400">
            {card.title}
          </p>

          <h2
            className={`mt-4 text-5xl font-black ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}