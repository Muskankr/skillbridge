import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section className="border-b border-[#262626] bg-black">

      <Container className="py-28 sm:py-36 lg:py-44">

        <div className="mx-auto max-w-5xl text-center">

          {/* Badge */}
          <span className="inline-flex rounded-full border border-[#333333] bg-[#0a0a0a] px-5 py-2 text-xs font-medium text-zinc-300 sm:text-sm">
            🚀 Build Your Developer Identity
          </span>

          {/* Heading */}
          <h1 className="mt-10 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
            One Profile.
            <br />
            Every Achievement.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            SkillBridge helps students build a professional developer
            profile, showcase projects, certificates, skills, achievements
            and impress recruiters — all from one place.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/signup"
              className="w-full rounded-lg bg-white px-8 py-3.5 text-center font-semibold text-black transition hover:bg-zinc-200 sm:w-auto"
            >
              🚀 Get Started
            </Link>

            <Link
              href="#features"
              className="w-full rounded-lg border border-[#333333] bg-black px-8 py-3.5 text-center font-semibold text-white transition hover:border-white hover:bg-[#0a0a0a] sm:w-auto"
            >
              Explore →
            </Link>

          </div>

          {/* Small trust line */}
          <p className="mt-8 text-sm text-zinc-600">
            Built for students, developers and future engineers.
          </p>

        </div>

      </Container>

    </section>
  );
}