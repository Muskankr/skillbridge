"use client";

import Link from "next/link";
import Container from "./Container";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-cyan-500/10 bg-[#050816]/80 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-black tracking-tight"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
            SkillBridge
          </span>
        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-300 transition hover:text-cyan-400"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="rounded-xl border border-cyan-500/20 px-5 py-2 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-2 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-105"
          >
            Get Started
          </Link>

        </div>

      </Container>
    </header>
  );
}