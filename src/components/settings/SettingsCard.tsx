"use client";

interface Props {
  setting: any;
  onOpen: () => void;
}

export default function SettingsCard({
  setting,
  onOpen,
}: Props) {
  const Icon = setting.icon;

  return (
    <div className="group rounded-3xl border border-white/10 bg-zinc-950 p-6 transition duration-300 hover:border-white/20 hover:bg-zinc-900">

      {/* Icon */}
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition group-hover:bg-white group-hover:text-black">
          <Icon className="h-5 w-5" />
        </div>
      )}

      {/* Content */}
      <h2 className="mt-6 text-xl font-bold text-white">
        {setting.title}
      </h2>

      <p className="mt-3 min-h-[48px] text-sm leading-6 text-zinc-400">
        {setting.description}
      </p>

      {/* Manage */}
      <button
        type="button"
        onClick={onOpen}
        className="mt-7 w-full rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
      >
        Manage
        <span className="ml-2">→</span>
      </button>
    </div>
  );
}