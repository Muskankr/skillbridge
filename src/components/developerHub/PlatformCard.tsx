interface Platform {
  name: string;
  username: string;
  connected: boolean;
  icon: React.ElementType;
  color: string;
}

interface Props {
  platform: Platform;
}

export default function PlatformCard({
  platform,
}: Props) {
  const Icon = platform.icon;

  return (
    <div className="rounded-2xl border border-[#262626] bg-[#050505] p-6 transition hover:border-[#3a3a3a]">

      {/* Platform */}
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#262626] bg-[#111]">
          <Icon className="h-6 w-6 text-zinc-300" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">
            {platform.name}
          </h2>

          <p className="mt-1 truncate text-sm text-zinc-500">
            {platform.connected
              ? platform.username
              : "Not Connected"}
          </p>
        </div>

      </div>

      {/* Connection Status */}
      <div className="mt-6 flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${
            platform.connected
              ? "bg-white"
              : "bg-zinc-700"
          }`}
        />

        <span className="text-xs font-medium text-zinc-500">
          {platform.connected
            ? "Connected"
            : "Not Connected"}
        </span>

      </div>

      {/* Button */}
      <button
        type="button"
        className="mt-6 w-full rounded-xl border border-[#333] bg-white py-3 font-semibold text-black transition hover:bg-zinc-200"
      >
        {platform.connected
          ? "View Profile"
          : "Connect"}
      </button>

    </div>
  );
}