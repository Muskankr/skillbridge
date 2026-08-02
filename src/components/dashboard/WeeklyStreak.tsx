"use client";

interface Props {
  activeDays: number;
}

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeeklyStreak({ activeDays }: Props) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm text-gray-400">This Week</p>

      <div className="flex justify-between">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xl transition-all ${
                index < activeDays
                  ? "bg-orange-500 shadow-lg shadow-orange-500/30"
                  : "bg-gray-800"
              }`}
            >
              {index < activeDays ? "🔥" : "○"}
            </div>

            <span className="text-xs text-gray-400">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}