import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[140px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-5xl text-center">

          <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
            🚀 Build Your Developer Identity
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight md:text-8xl">
            One Profile.
            <br />
            Every Achievement.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            SkillBridge helps students build a beautiful developer profile,
            showcase projects, certificates, skills, achievements and impress
            recruiters—all from one place.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <button className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition hover:bg-indigo-500">
              Get Started
            </button>

            <button className="rounded-xl border border-white/20 px-8 py-4 font-semibold hover:bg-white/5 transition">
              Explore
            </button>

          </div>

        </div>
      </Container>
    </section>
  );
}