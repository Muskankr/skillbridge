"use client";

import { useRouter } from "next/navigation";

export default function ProjectIdeaCard() {
  const router = useRouter();

  return (
    <div className="group rounded-3xl border border-[#262626] bg-[#050505] p-7 transition duration-300 hover:border-[#444]">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#292929] bg-[#111] text-xl">
        💡
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        AI Project Ideas
      </h2>

      <p className="mt-3 leading-7 text-zinc-500">
        Generate unique, portfolio-worthy project ideas based on
        your skills and interests.
      </p>

      <button
        type="button"
        onClick={() => router.push("/project-ideas")}
        className="
          mt-6 rounded-xl
          border border-white
          bg-white px-6 py-3
          text-sm font-semibold text-black
          transition
          hover:bg-zinc-200
        "
      >
        Generate Ideas
      </button>

    </div>
  );
}