interface Props {
  tool: any;
}

export default function ToolCard({ tool }: Props) {
  const Icon = tool.icon;

  return (
    <div className="group rounded-3xl border border-white/10 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20">

      <div className="flex items-center justify-between">

        <div className="rounded-2xl bg-indigo-600/20 p-4">
          <Icon className="h-8 w-8 text-indigo-400" />
        </div>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
          {tool.badge}
        </span>

      </div>

      <h2 className="mt-6 text-2xl font-bold">
        {tool.title}
      </h2>

      <p className="mt-3 text-slate-400">
        {tool.description}
      </p>

      <button className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold transition hover:bg-indigo-500">
        Open Tool
      </button>

    </div>
  );
}