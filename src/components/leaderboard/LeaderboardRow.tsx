"use client";

import {
  Crown,
  Flame,
  Star,
  Zap,
} from "lucide-react";

interface LeaderboardRowProps {
  rank: number;
  user: any;
}

export default function LeaderboardRow({
  rank,
  user,
}: LeaderboardRowProps) {

  const isFirst = rank === 1;
  const isSecond = rank === 2;
  const isThird = rank === 3;

  const getRankStyle = () => {
    if (isFirst) {
      return {
        wrapper:
          "border-yellow-500/20 bg-yellow-500/[0.03]",
        badge:
          "bg-yellow-500/10 text-yellow-400",
        icon: "text-yellow-400",
      };
    }

    if (isSecond) {
      return {
        wrapper:
          "border-slate-400/10 bg-slate-400/[0.02]",
        badge:
          "bg-slate-400/10 text-slate-300",
        icon: "text-slate-300",
      };
    }

    if (isThird) {
      return {
        wrapper:
          "border-orange-500/10 bg-orange-500/[0.02]",
        badge:
          "bg-orange-500/10 text-orange-400",
        icon: "text-orange-400",
      };
    }

    return {
      wrapper:
        "border-transparent",
      badge:
        "bg-[#151515] text-slate-400",
      icon: "text-slate-500",
    };
  };

  const style = getRankStyle();

  const displayName =
    user.full_name ||
    user.username ||
    "Developer";

  const username = user.username
    ? `@${user.username}`
    : "";

  return (
    <tr
      className={`border-b border-white/5 transition hover:bg-white/[0.02] ${style.wrapper}`}
    >

      {/* ================= RANK ================= */}

      <td className="px-6 py-5">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${style.badge}`}
        >
          {isFirst ? (
            <Crown
              className={`h-5 w-5 ${style.icon}`}
            />
          ) : (
            rank
          )}
        </div>

      </td>

      {/* ================= DEVELOPER ================= */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          {/* Avatar */}

          {user.avatar_url ? (

            <img
              src={user.avatar_url}
              alt={displayName}
              className="h-11 w-11 rounded-full border border-white/10 object-cover"
            />

          ) : (

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515] font-bold text-white">
              {displayName
                .charAt(0)
                .toUpperCase()}
            </div>

          )}

          <div className="min-w-0">

            <p className="truncate font-semibold text-white">
              {displayName}
            </p>

            {username && (
              <p className="mt-1 text-xs text-slate-500">
                {username}
              </p>
            )}

          </div>

        </div>

      </td>

      {/* ================= LEVEL ================= */}

      <td className="px-6 py-5">

        <span className="font-bold text-yellow-400">
          Lv {user.level ?? 1}
        </span>

      </td>

      {/* ================= STREAK ================= */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <Flame className="h-4 w-4 text-orange-400" />

          <span className="font-semibold text-slate-300">
            {user.streak ?? 0}
          </span>

          <span className="text-xs text-slate-600">
            days
          </span>

        </div>

      </td>

      {/* ================= CAREER SCORE ================= */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <Star className="h-4 w-4 text-pink-400" />

          <span className="font-bold text-pink-400">
            {user.career_score ?? 0}
          </span>

        </div>

      </td>

      {/* ================= XP ================= */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <Zap className="h-4 w-4 text-green-400" />

          <span className="font-bold text-green-400">
            {user.xp ?? 0}
          </span>

        </div>

      </td>

    </tr>
  );
}