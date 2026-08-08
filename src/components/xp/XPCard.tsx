"use client";

import { ReactNode } from "react";

interface XPCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: "indigo" | "yellow" | "green" | "pink";
}

const colors = {
  indigo: {
    icon: "bg-[#151515] text-indigo-400",
    value: "text-indigo-400",
  },

  yellow: {
    icon: "bg-[#151515] text-yellow-400",
    value: "text-yellow-400",
  },

  green: {
    icon: "bg-[#151515] text-green-400",
    value: "text-green-400",
  },

  pink: {
    icon: "bg-[#151515] text-pink-400",
    value: "text-pink-400",
  },
};

export default function XPCard({
  title,
  value,
  icon,
  color = "indigo",
}: XPCardProps) {
  const theme = colors[color];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#080808] p-6 transition-all duration-300 hover:border-white/20">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-slate-400">
          {title}
        </p>

        {icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 ${theme.icon}`}
          >
            {icon}
          </div>
        )}

      </div>

      <h2
        className={`mt-5 text-4xl font-black ${theme.value}`}
      >
        {value}
      </h2>

    </div>
  );
}