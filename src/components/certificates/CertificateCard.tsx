"use client";

import { Trash2, ExternalLink } from "lucide-react";
import { deleteCertificate } from "@/features/certificates/services/certificate.service";

interface Props {
  certificate: any;
}

export default function CertificateCard({
  certificate,
}: Props) {

  async function remove() {
    if (!confirm("Delete certificate?")) return;

    await deleteCertificate(certificate.id);

    window.location.reload();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-xl font-bold text-white">
        {certificate.title}
      </h2>

      <p className="mt-2 text-slate-400">
        {certificate.issuer}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {certificate.issue_date}
      </p>

      <p className="mt-4 text-slate-300">
        {certificate.description}
      </p>

      <div className="mt-6 flex gap-4">

        <a
          href={certificate.credential_url}
          target="_blank"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          <ExternalLink size={18} />
        </a>

        <button
          onClick={remove}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}