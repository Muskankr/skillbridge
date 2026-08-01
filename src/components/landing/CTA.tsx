import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CTA() {
  return (
    <section className="py-32">
      <Container>

        <div className="overflow-hidden rounded-[40px] border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-slate-900 to-purple-600/20 p-14 text-center">

          <p className="uppercase tracking-[0.4em] text-indigo-400 font-semibold">
            START TODAY
          </p>

          <h2 className="mt-6 text-5xl font-black leading-tight">
            Build Your Developer Identity.
            <br />
            Impress Every Recruiter.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Join SkillBridge and create one beautiful profile
            that showcases your projects, certificates,
            coding profiles and achievements.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/login"
              className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold transition hover:bg-indigo-500"
            >
              Create Free Profile
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-white/10 px-8 py-4 text-lg transition hover:bg-white/5"
            >
              Explore Features
            </Link>

          </div>

        </div>

      </Container>
    </section>
  );
}