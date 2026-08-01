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
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);

  async function loadProjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProjects(data || []);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="text-slate-400">
            Showcase your best work.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
        >
          {showForm ? "Close" : "+ Add Project"}
        </button>

      </div>

      {showForm && (
        <ProjectForm
          onCreated={() => {
            loadProjects();
            setShowForm(false);
          }}
        />
      )}

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">

          <div className="text-6xl">📂</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            No Projects Yet
          </h2>

          <p className="mt-2 text-slate-400">
            Add your first project to build your portfolio.
          </p>

        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>
      )}

    </main>
  );
}