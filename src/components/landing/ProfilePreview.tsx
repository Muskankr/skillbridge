import Container from "@/components/layout/Container";
import { profile } from "@/constants/profile";

export default function ProfilePreview() {
  return (
    <section className="border-b border-[#262626] bg-black">

      <Container className="py-28 sm:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Profile Preview
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Your Entire Developer Journey.
              <br />
              One Beautiful Profile.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Projects, certificates, coding profiles, achievements
              and skills—all organized into one professional page
              you can proudly share.
            </p>

          </div>

          {/* Profile Card */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#080808] p-7 shadow-2xl sm:p-8">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#333333] bg-white text-xl font-bold text-black">
                AJ
              </div>

              <div>

                <h3 className="text-xl font-semibold text-white">
                  {profile.name}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {profile.role}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  {profile.college}
                </p>

              </div>

            </div>

            {/* Completion */}
            <div className="mt-8">

              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">
                  Profile Completion
                </span>

                <span className="text-white">
                  {profile.completion}%
                </span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-[#222222]">

                <div
                  className="h-full rounded-full bg-white"
                  style={{
                    width: `${profile.completion}%`,
                  }}
                />

              </div>

            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3">

              {profile.stats.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#222222] bg-black p-5"
                >

                  <h3 className="text-2xl font-bold text-white">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-500">
                    {item.title}
                  </p>

                </div>
              ))}

            </div>

            {/* Skills */}
            <div className="mt-8 flex flex-wrap gap-2">

              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[#333333] bg-[#0d0d0d] px-3 py-1.5 text-xs text-zinc-300"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}