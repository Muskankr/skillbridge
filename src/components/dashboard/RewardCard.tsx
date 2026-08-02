"use client";

interface Props {
  streak: number;
}

export default function RewardCard({ streak }: Props) {
  let reward = 10;

  if (streak >= 30) reward = 150;
  else if (streak >= 14) reward = 75;
  else if (streak >= 7) reward = 50;
  else if (streak >= 3) reward = 20;

  return (
    <div className="mt-6 rounded-xl bg-[#1b2235] p-4">
      <p className="text-gray-400 text-sm">
        Tomorrow's Reward
      </p>

      <h2 className="mt-2 text-3xl font-bold text-yellow-400">
        +{reward} XP
      </h2>
    </div>
  );
}