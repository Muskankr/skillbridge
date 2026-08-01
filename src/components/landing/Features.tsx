import Container from "@/components/layout/Container";
import { features } from "@/constants/features";

export default function Features() {
  return (
    <section
      id="features"
      className="py-28"
    >
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-indigo-400 font-semibold tracking-[0.35em] uppercase">
            Features
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Everything You Need
          </h2>

          <p className="mt-6 text-slate-400 text-lg">
            Everything required to build an impressive developer profile
            from one modern platform.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-white/[0.05]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/15 text-indigo-400">
                  <Icon size={32} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}