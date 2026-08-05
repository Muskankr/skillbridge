import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">

      {/* Background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]" />

        <div className="absolute right-0 top-32 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[160px]" />

        <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[140px]" />

      </div>

      <Container>

        <div className="mx-auto max-w-5xl text-center">

          <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-semibold tracking-wide text-cyan-300 md:text-sm">
            🚀 Build Your Developer Identity
          </span>

          <h1 className="mt-8 bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-5xl font-black leading-tight text-transparent sm:text-6xl lg:text-8xl">
            One Profile.
            <br />
            Every Achievement.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl px-2 text-base leading-8 text-slate-300 sm:text-lg">
            SkillBridge helps students build a professional developer profile,
            showcase projects, certificates, skills, achievements and impress
            recruiters — all from one place.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

            <Link
              href="/signup"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-4 text-center font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:scale-105 sm:w-auto"
            >
              🚀 Get Started
            </Link>

            <Link
              href="#features"
              className="w-full rounded-xl border border-cyan-500/30 px-8 py-4 text-center font-semibold text-white transition hover:border-cyan-400 hover:bg-cyan-500/10 sm:w-auto"
            >
              Explore →
            </Link>

          </div>

        </div>

      </Container>

    </section>
  );
}