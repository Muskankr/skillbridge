"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { awardXP } from "@/features/xp/services/xp.service";
import {
  createProject,
  updateProject,
} from "@/features/projects/services/project.service";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
}

interface Props {
  onCreated: () => void;
  editingProject?: Project | null;
}

interface FormData {
  title: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
}

const emptyForm: FormData = {
  title: "",
  description: "",
  tech_stack: "",
  github_url: "",
  live_url: "",
};

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export default function ProjectForm({
  onCreated,
  editingProject,
}: Props) {
  const [formData, setFormData] =
    useState<FormData>(emptyForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || "",
        description:
          editingProject.description || "",
        tech_stack:
          editingProject.tech_stack || "",
        github_url:
          editingProject.github_url || "",
        live_url:
          editingProject.live_url || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingProject]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const title = formData.title.trim();
    const description =
      formData.description.trim();
    const techStack =
      formData.tech_stack.trim();
    const githubUrl =
      formData.github_url.trim();
    const liveUrl =
      formData.live_url.trim();

    // Required fields
    if (!title) {
      alert("Please enter a project title.");
      return;
    }

    if (!description) {
      alert(
        "Please enter a project description."
      );
      return;
    }

    if (!techStack) {
      alert("Please enter the tech stack.");
      return;
    }

    // Length validation
    if (title.length > 100) {
      alert(
        "Project title must be 100 characters or less."
      );
      return;
    }

    if (description.length > 1000) {
      alert(
        "Project description must be 1000 characters or less."
      );
      return;
    }

    if (techStack.length > 300) {
      alert(
        "Tech stack must be 300 characters or less."
      );
      return;
    }

    // GitHub URL validation
    if (githubUrl && !isValidUrl(githubUrl)) {
      alert(
        "Please enter a valid GitHub URL starting with https://"
      );
      return;
    }

    if (githubUrl) {
      try {
        const github = new URL(githubUrl);

        if (
          github.hostname !== "github.com" &&
          github.hostname !== "www.github.com"
        ) {
          alert(
            "GitHub URL must point to github.com."
          );
          return;
        }
      } catch {
        alert("Please enter a valid GitHub URL.");
        return;
      }
    }

    // Live URL validation
    if (liveUrl && !isValidUrl(liveUrl)) {
      alert(
        "Please enter a valid Live Demo URL starting with https://"
      );
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

      const projectData = {
        title,
        description,
        tech_stack: techStack,
        github_url: githubUrl,
        live_url: liveUrl,
      };

      let error = null;

      // UPDATE
      if (editingProject) {
        const result = await updateProject(
          editingProject.id,
          projectData
        );

        error = result.error;
      }

      // CREATE
      else {
        const result = await createProject({
          user_id: user.id,
          ...projectData,
        });

        error = result.error;

        // Award first-project XP only after
        // successful database insertion.
        if (!error) {
          const xpResult = await awardXP(
            user.id,
            "first_project"
          );

          if (!xpResult.success) {
            console.error(
              "Project XP error:",
              xpResult.error
            );
          }
        }
      }

      if (error) {
        console.error(
          "Project database error:",
          error
        );

        alert(error.message);
        return;
      }

      alert(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      setFormData(emptyForm);

      onCreated();
    } catch (error) {
      console.error(
        "Project submission error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#080808] p-6"
    >
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Projects
        </p>

        <h2 className="mt-3 text-3xl font-black text-white">
          {editingProject
            ? "Edit Project"
            : "Add New Project"}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Showcase your work, technologies and
          achievements.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Project Title
            <span className="ml-1 text-red-400">
              *
            </span>
          </label>

          <input
            name="title"
            placeholder="e.g. SkillBridge"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
            className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Description
            <span className="ml-1 text-red-400">
              *
            </span>
          </label>

          <textarea
            name="description"
            placeholder="Describe what your project does..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Tech Stack
            <span className="ml-1 text-red-400">
              *
            </span>
          </label>

          <input
            name="tech_stack"
            placeholder="React, Next.js, Supabase, Tailwind"
            value={formData.tech_stack}
            onChange={handleChange}
            required
            maxLength={300}
            className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* URLs */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              GitHub URL
              <span className="ml-2 text-xs text-zinc-600">
                optional
              </span>
            </label>

            <input
              type="url"
              name="github_url"
              placeholder="https://github.com/username/project"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#292929] bg-[#0b0b0b] p-4 text-white placeholder:text-zinc-700 outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Live Demo URL
              <span className="ml-2 text-xs text-zinc-600">
                optional
              </span>
            </label>

            <input
              type="url"
              name="live_url"
              placeholder="https://your-project.com"
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
            ? editingProject
              ? "Updating..."
              : "Saving..."
            : editingProject
            ? "Update Project"
            : "Add Project"}
        </button>
      </div>
    </form>
  );
}