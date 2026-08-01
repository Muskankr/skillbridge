"use client";

import Link from "next/link";

const actions = [
  {
    title: "Add Project",
    href: "/projects",
  },
  {
    title: "Upload Certificate",
    href: "/certificates",
  },
  {
    title: "Edit Profile",
    href: "/profile",
  },
  {
    title: "Add Achievement",
    href: "/achievements",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
      <h2 className="text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="rounded-2xl border border-white/10 p-5 transition hover:border-indigo-500 hover:bg-indigo-500/10"
          >
            {action.title}
          </Link>
        ))}
      </div>
    </section>
  );
}