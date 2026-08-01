interface Props {
  profile: any;
}

export default function SocialLinks({ profile }: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Social Links
      </h2>

      <div className="space-y-4">

        <a
          href={profile.github_url}
          target="_blank"
          className="block text-indigo-400 hover:underline"
        >
          GitHub
        </a>

        <a
          href={profile.linkedin_url}
          target="_blank"
          className="block text-indigo-400 hover:underline"
        >
          LinkedIn
        </a>

        <a
          href={profile.portfolio_url}
          target="_blank"
          className="block text-indigo-400 hover:underline"
        >
          Portfolio
        </a>

      </div>

    </section>
  );
}