"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardLinks } from "@/constants/dashboard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";

import LogoutButton from "@/components/auth/LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();

  const { user } = useAuth();
  const { profile, loading } = useProfile();

  const initial =
    profile?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <aside className="hidden lg:flex w-72 h-screen sticky top-0 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl flex-col">

      {/* Logo + User */}

      <div className="border-b border-white/10 px-8 py-8">

        <h1 className="text-3xl font-black text-white">
          SkillBridge
        </h1>

        <div className="mt-6 flex items-center gap-4">

          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="h-14 w-14 rounded-full object-cover border-2 border-indigo-500"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
              {initial}
            </div>
          )}

          <div className="min-w-0">

            <h2 className="truncate font-semibold text-white">
              {loading
                ? "Loading..."
                : profile?.full_name || "Developer"}
            </h2>

            <p className="truncate text-sm text-slate-400">
              {profile?.headline ||
                profile?.college ||
                user?.email}
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5">

        {dashboardLinks.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-indigo-600/20 hover:text-white"
              }`}
            >
              <Icon size={22} />

              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-white/10 p-5">

        <LogoutButton />

      </div>

    </aside>
  );
}