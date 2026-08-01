import Container from "@/components/layout/Container";
import { steps } from "@/constants/steps";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-32"
    >
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-indigo-400 font-semibold uppercase tracking-[0.35em]">
            HOW IT WORKS
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Four Simple Steps
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            From creating your account to landing opportunities—
            SkillBridge guides your complete journey.
          </p>

        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-indigo-500/40 transition"
              >

                <div className="absolute right-6 top-6 text-6xl font-black text-white/5">
                  0{index + 1}
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
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