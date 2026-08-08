interface Props {
  title: string;
  completed: boolean;
}

export default function RoadmapCard({
  title,
  completed,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#262626] bg-[#050505] p-5 transition hover:border-[#3a3a3a]">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
            completed
              ? "border-white bg-white text-black"
              : "border-[#333] bg-[#111] text-zinc-500"
          }`}
        >
          {completed ? "✓" : "•"}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-600">
            {completed
              ? "Learning milestone completed"
              : "Keep working on this milestone"}
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
          completed
            ? "border-white/20 bg-white text-black"
            : "border-[#333] bg-[#111] text-zinc-500"
        }`}
      >
        {completed ? "Completed" : "Pending"}
      </span>
    </div>
  );
}