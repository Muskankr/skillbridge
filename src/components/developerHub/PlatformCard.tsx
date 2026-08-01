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
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-indigo-500">

      <div className="flex items-center gap-4">

        <Icon className={`h-8 w-8 ${platform.color}`} />

        <div>

          <h2 className="text-xl font-bold">
            {platform.name}
          </h2>

          <p className="text-slate-400">
            {platform.connected
              ? platform.username
              : "Not Connected"}
          </p>

        </div>

      </div>

      <button className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold hover:bg-indigo-500">

        {platform.connected
          ? "View Profile"
          : "Connect"}

      </button>

    </div>
  );
}