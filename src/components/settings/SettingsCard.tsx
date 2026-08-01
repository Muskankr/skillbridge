interface Props {
  setting: any;
}

export default function SettingsCard({
  setting,
}: Props) {

  const Icon = setting.icon;

  return (
    <div className="group rounded-3xl border border-white/10 bg-slate-900/60 p-7 transition duration-300 hover:border-indigo-500 hover:-translate-y-1">

      <div className="rounded-2xl bg-indigo-600/20 p-4 w-fit">
        <Icon className="h-8 w-8 text-indigo-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        {setting.title}
      </h2>

      <p className="mt-3 text-slate-400">
        {setting.description}
      </p>

      <button className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 transition">
        Open
      </button>

    </div>
  );
}