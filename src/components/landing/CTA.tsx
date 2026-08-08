import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CTA() {
  return (
    <section className="bg-black">

      <Container className="py-28 sm:py-32">

        <div className="rounded-2xl border border-[#333333] bg-[#080808] px-6 py-20 text-center sm:px-12">

          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
            Start Today
          </p>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Build Your Developer Identity.
            <br />
            Impress Every Recruiter.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Join SkillBridge and create one professional profile
            that showcases your projects, certificates, coding
            profiles and achievements.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/login"
              className="rounded-lg bg-white px-8 py-3.5 font-semibold text-black transition hover:bg-zinc-200"
            >
              Create Free Profile
            </Link>

            <Link
              href="#features"
              className="rounded-lg border border-[#333333] bg-black px-8 py-3.5 font-semibold text-white transition hover:border-white hover:bg-[#111111]"
            >
              Explore Features
            </Link>

          </div>

        </div>

      </Container>

    </section>
  );
}