"use client";

import {
  Trash2,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";

import {
  deleteCertificate,
} from "@/features/certificates/services/certificate.service";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  description: string;
}

interface Props {
  certificate: Certificate;
  onDeleted: (
    certificateId: string
  ) => void;
}

export default function CertificateCard({
  certificate,
  onDeleted,
}: Props) {
  async function remove() {
    if (
      !confirm(
        "Are you sure you want to delete this certificate?"
      )
    ) {
      return;
    }

    const { error } =
      await deleteCertificate(
        certificate.id
      );

    if (error) {
      console.error(
        "Certificate delete error:",
        error
      );

      alert(
        "Failed to delete certificate."
      );

      return;
    }

    onDeleted(certificate.id);
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg transition hover:-translate-y-1 hover:border-indigo-500/30">
      {/* Certificate image */}
      {certificate.image_url ? (
        <div className="h-48 overflow-hidden bg-zinc-950">
          <img
            src={certificate.image_url}
            alt={`${certificate.title} certificate`}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-950/40 to-violet-950/40">
          <BadgeCheck className="h-16 w-16 text-indigo-400/50" />
        </div>
      )}

      <div className="p-6">
        {/* Credential evidence */}
        <div className="mb-4 flex items-center gap-2 text-sm text-emerald-400">
          <BadgeCheck className="h-4 w-4" />

          <span>
            Credential link available
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white">
          {certificate.title}
        </h2>

        {/* Issuer */}
        <p className="mt-2 font-medium text-slate-400">
          {certificate.issuer}
        </p>

        {/* Date */}
        {certificate.issue_date && (
          <p className="mt-2 text-sm text-slate-500">
            Issued on{" "}
            {new Date(
              certificate.issue_date
            ).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        )}

        {/* Description */}
        {certificate.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">
            {certificate.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <a
            href={
              certificate.credential_url
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <ExternalLink size={17} />
            View Credential
          </a>

          <button
            type="button"
            onClick={remove}
            className="rounded-lg bg-red-600/10 px-4 py-2.5 text-red-400 transition hover:bg-red-600 hover:text-white"
            aria-label={`Delete ${certificate.title}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}