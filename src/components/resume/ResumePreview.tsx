"use client";

interface Props {
  resume: any;
}

export default function ResumePreview({ resume }: Props) {
  if (!resume) return null;

  const { profile, projects, certificates, achievements } = resume;

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-black shadow-xl">

      {/* Header */}

      <div className="border-b pb-6">

        <h1 className="text-4xl font-bold">
          {profile?.full_name || "Your Name"}
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          {profile?.headline}
        </p>

        <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-600">

          {profile?.location && (
            <span>📍 {profile.location}</span>
          )}

          {profile?.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              className="text-blue-600"
            >
              GitHub
            </a>
          )}

          {profile?.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              className="text-blue-600"
            >
              LinkedIn
            </a>
          )}

          {profile?.portfolio_url && (
            <a
              href={profile.portfolio_url}
              target="_blank"
              className="text-blue-600"
            >
              Portfolio
            </a>
          )}

        </div>

      </div>

      {/* About */}

      <section className="mt-8">

        <h2 className="mb-3 border-b pb-2 text-xl font-bold">
          Professional Summary
        </h2>

        <p className="leading-7">
          {profile?.bio || "No summary added."}
        </p>

      </section>

      {/* Education */}

      <section className="mt-8">

        <h2 className="mb-3 border-b pb-2 text-xl font-bold">
          Education
        </h2>

        <div>

          <h3 className="font-semibold">
            {profile?.college}
          </h3>

          <p>
            {profile?.branch}
          </p>

          <p>
            Graduation Year : {profile?.graduation_year}
          </p>

        </div>

      </section>

      {/* Projects */}

      <section className="mt-8">

        <h2 className="mb-3 border-b pb-2 text-xl font-bold">
          Projects
        </h2>

        {projects.length === 0 ? (
          <p>No Projects Added</p>
        ) : (
          projects.map((project: any) => (
            <div
              key={project.id}
              className="mb-5"
            >
              <h3 className="font-semibold">
                {project.title}
              </h3>

              <p className="text-gray-700">
                {project.description}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Tech Stack : {project.tech_stack}
              </p>

            </div>
          ))
        )}

      </section>

      {/* Certificates */}

      <section className="mt-8">

        <h2 className="mb-3 border-b pb-2 text-xl font-bold">
          Certificates
        </h2>

        {certificates.length === 0 ? (
          <p>No Certificates Added</p>
        ) : (
          certificates.map((certificate: any) => (
            <div
              key={certificate.id}
              className="mb-3"
            >
              <h3 className="font-semibold">
                {certificate.title}
              </h3>

              <p>
                {certificate.issuer}
              </p>
            </div>
          ))
        )}

      </section>

      {/* Achievements */}

      <section className="mt-8">

        <h2 className="mb-3 border-b pb-2 text-xl font-bold">
          Achievements
        </h2>

        {achievements.length === 0 ? (
          <p>No Achievements Added</p>
        ) : (
          <ul className="list-disc pl-6">

            {achievements.map((achievement: any) => (
              <li key={achievement.id}>
                {achievement.title}
              </li>
            ))}

          </ul>
        )}

      </section>

    </div>
  );
}