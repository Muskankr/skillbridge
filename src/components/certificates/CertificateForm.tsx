"use client";

import { useState } from "react";
import {
  Award,
  Calendar,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { addCertificate } from "@/features/certificates/services/certificate.service";

interface Props {
  onCreated?: () => void;
}

interface FormData {
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  description: string;
}

const initialForm: FormData = {
  title: "",
  issuer: "",
  issue_date: "",
  credential_url: "",
  image_url: "",
  description: "",
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

export default function CertificateForm({
  onCreated,
}: Props) {
  const [formData, setFormData] =
    useState<FormData>(initialForm);

  const [loading, setLoading] = useState(false);

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
    e: React.FormEvent
  ) {
    e.preventDefault();

    const title = formData.title.trim();
    const issuer = formData.issuer.trim();
    const issueDate = formData.issue_date;
    const credentialUrl =
      formData.credential_url.trim();
    const imageUrl = formData.image_url.trim();
    const description =
      formData.description.trim();

    // Required fields
    if (!title) {
      alert("Please enter the certificate title.");
      return;
    }

    if (title.length < 3) {
      alert(
        "Certificate title must contain at least 3 characters."
      );
      return;
    }

    if (title.length > 150) {
      alert(
        "Certificate title must be 150 characters or less."
      );
      return;
    }

    if (!issuer) {
      alert(
        "Please enter the issuing organization."
      );
      return;
    }

    if (issuer.length < 2) {
      alert(
        "Please enter a valid issuing organization."
      );
      return;
    }

    if (issuer.length > 150) {
      alert(
        "Issuing organization must be 150 characters or less."
      );
      return;
    }

    if (!issueDate) {
      alert(
        "Please enter the certificate issue date."
      );
      return;
    }

    // Prevent future dates
    const selectedDate = new Date(issueDate);

    if (
      Number.isNaN(selectedDate.getTime())
    ) {
      alert("Please enter a valid issue date.");
      return;
    }

    if (selectedDate > new Date()) {
      alert(
        "Certificate issue date cannot be in the future."
      );
      return;
    }

    // Credential URL
    if (!credentialUrl) {
      alert(
        "Please provide the certificate verification or credential URL."
      );
      return;
    }

    if (!isValidUrl(credentialUrl)) {
      alert(
        "Please enter a valid credential URL starting with https://"
      );
      return;
    }

    // Image URL
    if (
      imageUrl &&
      !isValidUrl(imageUrl)
    ) {
      alert(
        "Please enter a valid certificate image URL."
      );
      return;
    }

    if (description.length > 1000) {
      alert(
        "Description must be 1000 characters or less."
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

      const { error } =
        await addCertificate({
          user_id: user.id,
          title,
          issuer,
          issue_date: issueDate,
          credential_url: credentialUrl,
          image_url: imageUrl,
          description,
        });

      if (error) {
        console.error(
          "Certificate database error:",
          error
        );

        alert(error.message);
        return;
      }

      alert(
        "🎉 Certificate added successfully!"
      );

      setFormData(initialForm);

      onCreated?.();
    } catch (error) {
      console.error(
        "Certificate submission error:",
        error
      );

      alert(
        "Something went wrong while adding the certificate."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-zinc-900 p-6"
    >
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
            Add a certification or credential with
            verification evidence.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 grid gap-5">
        <FormInput
          name="title"
          placeholder="Certificate Title *"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={150}
        />

        <FormInput
          name="issuer"
          placeholder="Issuing Organization *"
          value={formData.issuer}
          onChange={handleChange}
          required
          maxLength={150}
        />

        {/* Date */}
        <div className="relative">
          <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
            max={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            required
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
          />
        </div>

        {/* Credential URL */}
        <div>
          <div className="relative">
            <LinkIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="url"
              name="credential_url"
              placeholder="Verification / Credential URL *"
              value={formData.credential_url}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          <p className="mt-2 text-xs text-zinc-600">
            Add the official certificate verification
            page or credential URL.
          </p>
        </div>

        {/* Image URL */}
        <div className="relative">
          <ImageIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

          <input
            type="url"
            name="image_url"
            placeholder="Certificate Image URL (optional)"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          rows={5}
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          maxLength={1000}
          className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-5 w-5" />

          {loading
            ? "Saving..."
            : "Save Certificate"}
        </button>
      </div>
    </form>
  );
}

/* =====================================================
   INPUT
===================================================== */

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string;
  required?: boolean;
  maxLength?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormInput({
  name,
  placeholder,
  value,
  required,
  maxLength,
  onChange,
}: FormInputProps) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      className="w-full rounded-xl border border-white/10 bg-zinc-950 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
    />
  );
}