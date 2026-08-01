interface Props {
  profile: any;
}

export default function HeroSection({ profile }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900 p-10">

      <div className="flex flex-col items-center gap-6 md:flex-row">

        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-indigo-600 text-5xl font-black text-white">
          {profile.full_name?.charAt(0) || "U"}
        </div>

        <div className="flex-1">

          <h1 className="text-5xl font-black text-white">
            {profile.full_name}
          </h1>

          <p className="mt-2 text-xl text-indigo-400">
            {profile.headline || "Developer"}
          </p>

          <p className="mt-4 text-slate-400">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <div className="rounded-xl bg-slate-800 px-5 py-3 text-white">
              ⭐ Career Score: {profile.career_score}
            </div>

            <div className="rounded-xl bg-slate-800 px-5 py-3 text-white">
              🔥 XP: {profile.xp}
            </div>

            <div className="rounded-xl bg-slate-800 px-5 py-3 text-white">
              🏆 Level: {profile.level}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}