"use client";

import Link from "next/link";
import Container from "./Container";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">

        <Link
          href="/"
          className="text-3xl font-black tracking-tight"
        >
          SkillBridge
        </Link>

        <nav className="hidden gap-10 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-300 hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">

          <Link
  href="/login"
  className="rounded-lg px-5 py-2 hover:bg-white/5"
>
  Login
</Link>

          <button className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold hover:bg-indigo-500">
            Get Started
          </button>

        </div>

      </Container>
    </header>
  );
}