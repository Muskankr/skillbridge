"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { awardXP } from "@/features/xp/services/xp.service";
import {
  createProject,
  updateProject,
} from "@/features/projects/services/project.service";

interface Props {
  onCreated: () => void;
  editingProject?: any;
}

export default function ProjectForm({
  onCreated,
  editingProject,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || "",
        description: editingProject.description || "",
        tech_stack: editingProject.tech_stack || "",
        github_url: editingProject.github_url || "",
        live_url: editingProject.live_url || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        github_url: "",
        live_url: "",
      });
    }
  }, [editingProject]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a project title.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter a project description.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        return;
      }

      let error;

      if (editingProject) {
        const result = await updateProject(
          editingProject.id,
          {
            title: formData.title,
            description: formData.description,
            tech_stack: formData.tech_stack,
            github_url: formData.github_url,
            live_url: formData.live_url,
          }
        );

        error = result.error;
      } else {
        const result = await createProject({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          tech_stack: formData.tech_stack,
          github_url: formData.github_url,
          live_url: formData.live_url,
        });

        error = result.error;

        /*
         * Award XP only after the project was
         * successfully created.
         */
        if (!error) {
          const { count } = await supabase
            .from("projects")
            .select("id", {
              count: "exact",
              head: true,
            })
            .eq("user_id", user.id);

          if (count === 1) {
            await awardXP(
              user.id,
              50,
              "Added First Project"
            );
          }
        }
      }

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        github_url: "",
        live_url: "",
      });

      onCreated();
    } catch (error) {
      console.error("Project error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#262626] bg-black p-6 md:p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">
          PROJECTS
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          {editingProject
            ? "Edit Project"
            : "Add New Project"}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Showcase your work, technologies and achievements.
        </p>
      </div>

      <div className="grid gap-5">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Project Title
          </label>

          <input
            name="title"
            placeholder="e.g. SkillBridge"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Describe what your project does..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full resize-none rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Tech Stack
          </label>

          <input
            name="tech_stack"
            placeholder="React, Next.js, Supabase, Tailwind"
            value={formData.tech_stack}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* URLs */}
        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              GitHub URL
            </label>

            <input
              name="github_url"
              placeholder="https://github.com/..."
              value={formData.github_url}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Live Demo URL
            </label>

            <input
              name="live_url"
              placeholder="https://..."
              value={formData.live_url}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
            />
          </div>

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full rounded-xl bg-white py-4 font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : editingProject
            ? "Update Project"
            : "Add Project"}
        </button>
      </div>
    </form>
  );
}