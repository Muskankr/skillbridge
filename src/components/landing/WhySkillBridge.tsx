import Container from "@/components/layout/Container";
import { benefits } from "@/constants/benefits";

export default function WhySkillBridge() {
  return (
    <section
      id="why-skillbridge"
      className="border-b border-[#1f1f1f] bg-black"
    >
      <Container className="py-28 sm:py-32">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Why SkillBridge
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            More Than Just A Portfolio
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            SkillBridge helps students organize everything they build,
            achieve and learn in one professional profile.
          </p>

        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] md:grid-cols-2">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-[#050505] p-10 transition hover:bg-[#0d0d0d]"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#333333] text-zinc-300">
                  <Icon size={22} />
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}