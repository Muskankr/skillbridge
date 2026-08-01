import Container from "@/components/layout/Container";
import { profile } from "@/constants/profile";

export default function ProfilePreview() {
  return (
    <section className="py-32">
      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <div>

            <p className="font-semibold uppercase tracking-[0.35em] text-indigo-400">
              PROFILE PREVIEW
            </p>

            <h2 className="mt-5 text-5xl font-black">
              Your Entire Developer Journey.
              <br />
              One Beautiful Profile.
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-400">
              Projects, certificates, coding profiles,
              achievements and skills—all organized into one
              professional page you can proudly share.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold">
                AJ
              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  {profile.name}
                </h3>

                <p className="text-slate-400">
                  {profile.role}
                </p>

                <p className="text-sm text-slate-500">
                  {profile.college}
                </p>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex justify-between text-sm">

                <span>Profile Completion</span>

                <span>{profile.completion}%</span>

              </div>

              <div className="mt-3 h-3 rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{
                    width: `${profile.completion}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">

              {profile.stats.map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-900/60 p-5 text-center"
                >

                  <h3 className="text-3xl font-black text-indigo-400">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {item.title}
                  </p>

                </div>

              ))}

            </div>

            <div className="mt-10 flex flex-wrap gap-3">

              {profile.skills.map((skill) => (

                <span
                  key={skill}
                  className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm"
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