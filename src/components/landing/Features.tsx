import Container from "@/components/layout/Container";
import { features } from "@/constants/features";

export default function Features() {
  return (
    <section
      id="features"
      className="border-b border-[#262626] bg-black"
    >
      <Container className="py-28 sm:py-32">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Features
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Everything You Need
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Everything required to build an impressive developer profile
            from one modern platform.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group border-b border-[#242424] p-8 transition hover:bg-[#111111] md:border-r xl:border-b-0"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#333333] bg-black text-zinc-300 transition group-hover:border-[#555555] group-hover:text-white">
                  <Icon size={20} />
                </div>

                <h3 className="mt-7 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
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