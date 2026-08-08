import Container from "@/components/layout/Container";
import { steps } from "@/constants/steps";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-[#1f1f1f] bg-black"
    >
      <Container className="py-28 sm:py-32">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            How It Works
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Four Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            From creating your account to landing opportunities—
            SkillBridge guides your complete journey.
          </p>

        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative bg-[#050505] p-8 transition hover:bg-[#0d0d0d]"
              >

                <span className="absolute right-6 top-5 text-5xl font-bold text-[#1a1a1a]">
                  0{index + 1}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#333333] text-zinc-300">
                  <Icon size={21} />
                </div>

                <h3 className="mt-7 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}