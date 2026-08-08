"use client";

interface Props {
  tool: any;
}

export default function ToolCard({ tool }: Props) {
  const Icon = tool.icon;

  return (
    <div className="rounded-3xl border border-[#262626] bg-[#050505] p-7 transition duration-300 hover:border-[#444]">

      <div className="flex items-center justify-between">

        <div className="rounded-2xl border border-[#292929] bg-[#111] p-4">
          <Icon className="h-7 w-7 text-zinc-300" />
        </div>

        <span className="rounded-full border border-[#292929] bg-[#111] px-3 py-1 text-xs font-semibold text-zinc-400">
          {tool.badge}
        </span>

      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        {tool.title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-500">
        {tool.description}
      </p>

      <button
        type="button"
        className="
          mt-8 w-full rounded-xl
          border border-white
          bg-white py-3
          text-sm font-semibold text-black
          transition
          hover:bg-zinc-200
        "
      >
        Open Tool
      </button>

    </div>
  );
}