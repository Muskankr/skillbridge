"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  created_at?: string;
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  async function loadProjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Failed to load projects:", error);
      return;
    }

    setProjects(data || []);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleEdit(project: Project) {
    setEditingProject(project);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete project:", error);
      alert(error.message);
      return;
    }

    setProjects((prev) =>
      prev.filter((project) => project.id !== id)
    );
  }

  function handleFormClose() {
    setShowForm(false);
    setEditingProject(null);
  }

  async function handleProjectCreated() {
    await loadProjects();
    handleFormClose();
  }

  return (
    <main className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
            Portfolio
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
            Projects
          </h1>

          <p className="mt-2 text-zinc-500">
            Showcase your best work and build your developer identity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (showForm) {
              handleFormClose();
            } else {
              setEditingProject(null);
              setShowForm(true);
            }
          }}
          className="rounded-xl border border-[#333] bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          {showForm
            ? "Close"
            : "+ Add Project"}
        </button>
      </div>

      {/* Project Form */}
      {showForm && (
        <section className="rounded-2xl border border-[#262626] bg-[#050505] p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
              {editingProject
                ? "Edit Project"
                : "New Project"}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              {editingProject
                ? "Update your project"
                : "Add a new project"}
            </h2>
          </div>

          <ProjectForm
            onCreated={handleProjectCreated}
            editingProject={editingProject}
          />
        </section>
      )}

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#333] bg-[#050505] p-12 text-center">
          <div className="text-5xl">📂</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            No Projects Yet
          </h2>

          <p className="mt-2 text-zinc-500">
            Add your first project to build your portfolio.
          </p>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            + Add Your First Project
          </button>
        </div>
      ) : (
        /* Projects */
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEdit(project)}
              onDelete={() => handleDelete(project.id)}
            />
          ))}
        </div>
      )}

    </main>
  );
}