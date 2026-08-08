"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  return (
    <header className="border-b border-[#1f1f1f] bg-black">
      <Container className="flex h-16 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white transition hover:text-neutral-300"
        >
          SkillBridge
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-[#a1a1a1] transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-lg border border-[#333] px-4 py-2 text-sm font-medium text-white transition hover:border-[#555] hover:bg-[#111]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg border border-white bg-white px-4 py-2 text-sm font-medium !text-black transition hover:bg-[#e5e5e5]"
          >
            Get Started
          </Link>

        </div>

      </Container>
    </header>
  );
}