interface Props {
  title: string;
  completed: boolean;
}

export default function RoadmapCard({
  title,
  completed,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-900 border border-white/10 p-5">

      <h3 className="text-white">
        {title}
      </h3>

      <span
        className={`rounded-full px-4 py-1 text-sm ${
          completed
            ? "bg-green-500 text-white"
            : "bg-slate-700 text-slate-300"
        }`}
      >
        {completed ? "Completed" : "Pending"}
      </span>

    </div>
  );
}