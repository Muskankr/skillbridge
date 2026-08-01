"use client";

import { useState } from "react";
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
  title: editingProject?.title || "",
  description: editingProject?.description || "",
  tech_stack: editingProject?.tech_stack || "",
  github_url: editingProject?.github_url || "",
  live_url: editingProject?.live_url || "",
});

  async function handleSubmit() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    let error;

if (editingProject) {
  ({ error } = await updateProject(editingProject.id, {
    title: formData.title,
    description: formData.description,
    tech_stack: formData.tech_stack,
    github_url: formData.github_url,
    live_url: formData.live_url,
  }));
} else {
  ({ error } = await createProject({
    user_id: user.id,
    title: formData.title,
    description: formData.description,
    tech_stack: formData.tech_stack,
    github_url: formData.github_url,
    live_url: formData.live_url,
  }));

  await awardXP(
    user.id,
    50,
    "Added First Project"
  );
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
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900 p-6">
      <input
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        rows={4}
        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <input
        placeholder="Tech Stack (React, Next.js, Supabase)"
        value={formData.tech_stack}
        onChange={(e) =>
          setFormData({
            ...formData,
            tech_stack: e.target.value,
          })
        }
        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <input
        placeholder="GitHub URL"
        value={formData.github_url}
        onChange={(e) =>
          setFormData({
            ...formData,
            github_url: e.target.value,
          })
        }
        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <input
        placeholder="Live Demo URL"
        value={formData.live_url}
        onChange={(e) =>
          setFormData({
            ...formData,
            live_url: e.target.value,
          })
        }
        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={handleSubmit}
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
      >
        {editingProject ? "Update Project" : "Add Project"}
      </button>
    </div>
  );
}