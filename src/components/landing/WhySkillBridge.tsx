import Container from "@/components/layout/Container";
import { benefits } from "@/constants/benefits";

export default function WhySkillBridge() {
  return (
    <section className="py-32">
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-indigo-400 font-semibold">
            Why SkillBridge
          </p>

          <h2 className="mt-5 text-5xl font-black">
            More Than Just A Portfolio
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            SkillBridge helps students organize everything they build,
            achieve and learn in one professional profile.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 transition hover:border-indigo-500/40 hover:bg-white/[0.05]"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
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