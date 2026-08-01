"use client";

import {
  Code2,
  ExternalLink,
  FolderGit2,
  Pencil,
  Trash2,
} from "lucide-react";

import { deleteProject } from "@/features/projects/services/project.service";

interface Props {
  project: any;
  onDelete?: () => void;
  onEdit?: (project: any) => void;
}

export default function ProjectCard({
  project,
  onDelete,
  onEdit,
}: Props) {

  async function handleDelete() {

    const ok = confirm(
      "Delete this project?"
    );

    if (!ok) return;

    const { error } =
      await deleteProject(project.id);

    if (error) {
      alert(error.message);
      return;
    }

    if (onDelete) {
  onDelete();
}
  }

  const techs =
    project.tech_stack
      ?.split(",")
      .map((x: string) => x.trim()) || [];

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-indigo-500">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <FolderGit2
              className="text-indigo-400"
            />

            <h2 className="text-2xl font-bold">
              {project.title}
            </h2>

          </div>

          <p className="mt-4 text-slate-400">
            {project.description}
          </p>

        </div>

        <div className="flex gap-3">

          {onEdit && (
            <button
              onClick={() => onEdit(project)}
            >
              <Pencil className="hover:text-blue-400" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDelete}
            >
              <Trash2 className="hover:text-red-400" />
            </button>
          )}

        </div>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        {techs.map((tech: string) => (
          <span
            key={tech}
            className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm"
          >
            {tech}
          </span>
        ))}

      </div>

      <div className="mt-6 flex gap-6">

        {project.github_url && (
          <a
  href={project.github_url}
  target="_blank"
  rel="noopener noreferrer"
>
            <Code2 className="hover:text-indigo-400" />
          </a>
        )}

        {project.live_url && (
          <a
  href={project.live_url}
  target="_blank"
  rel="noopener noreferrer"
>
            <ExternalLink className="hover:text-indigo-400" />
          </a>
        )}

      </div>

    </div>
  );
}