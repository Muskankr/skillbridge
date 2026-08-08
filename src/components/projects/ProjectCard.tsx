"use client";

import {
  ExternalLink,
  Pencil,
  Trash2,
  FolderGit2,
  Code2,
} from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tech_stack?: string;
    github_url?: string;
    live_url?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-[#262626] bg-black p-6 transition hover:border-[#444]">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#292929] bg-[#0b0b0b]">
          <FolderGit2
            size={22}
            className="text-zinc-400"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-[#292929] p-2 text-zinc-500 transition hover:bg-[#111] hover:text-white"
            title="Edit project"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-[#292929] p-2 text-zinc-500 transition hover:bg-[#111] hover:text-red-400"
            title="Delete project"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-bold text-white">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-500">
        {project.description}
      </p>

      {/* Tech Stack */}
      {project.tech_stack && (
        <div className="mt-5 flex flex-wrap gap-2">

          {project.tech_stack
            .split(",")
            .map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[#292929] bg-[#0b0b0b] px-3 py-1.5 text-xs font-medium text-zinc-400"
              >
                {tech.trim()}
              </span>
            ))}

        </div>
      )}

      {/* Links */}
      <div className="mt-auto flex gap-3 pt-7">

        {/* GitHub */}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#292929] bg-[#0b0b0b] py-3 text-sm font-semibold text-zinc-300 transition hover:bg-[#151515] hover:text-white"
          >
            <Code2 size={17} />
            GitHub
          </a>
        )}

        {/* Live Demo */}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            <ExternalLink size={17} />
            Live Demo
          </a>
        )}

      </div>

    </article>
  );
}