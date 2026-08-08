"use client";

import { useState } from "react";
import { Award, Calendar, Link as LinkIcon, Image, Save } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { addCertificate } from "@/features/certificates/services/certificate.service";

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issue_date: "",
    credential_url: "",
    image_url: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit() {
    if (!formData.title.trim()) {
      alert("Please enter the certificate title.");
      return;
    }

    if (!formData.issuer.trim()) {
      alert("Please enter the issuing organization.");
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

      const { error } = await addCertificate({
        user_id: user.id,
        title: formData.title,
        issuer: formData.issuer,
        issue_date: formData.issue_date,
        credential_url: formData.credential_url,
        image_url: formData.image_url,
        description: formData.description,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("🎉 Certificate added successfully!");

      setFormData({
        title: "",
        issuer: "",
        issue_date: "",
        credential_url: "",
        image_url: "",
        description: "",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding the certificate.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6 sm:p-8">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
          <Award className="h-6 w-6 text-violet-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Add Certificate
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Showcase your certifications and credentials.
          </p>
        </div>

      </div>

      {/* Form */}
      <div className="mt-8 grid gap-5">

        <FormInput
          name="title"
          placeholder="Certificate Title"
          value={formData.title}
          onChange={handleChange}
        />

        <FormInput
          name="issuer"
          placeholder="Issuing Organization"
          value={formData.issuer}
          onChange={handleChange}
        />

        <div className="relative">
          <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
          />
        </div>

        <div className="relative">
          <LinkIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            name="credential_url"
            placeholder="Credential URL"
            value={formData.credential_url}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
          />
        </div>

        <div className="relative">
          <Image className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            name="image_url"
            placeholder="Certificate Image URL"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
          />
        </div>

        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-5 w-5" />

          {loading ? "Saving..." : "Save Certificate"}
        </button>

      </div>
    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormInput({
  name,
  placeholder,
  value,
  onChange,
}: FormInputProps) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-white/10 bg-zinc-950 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
    />
  );
}