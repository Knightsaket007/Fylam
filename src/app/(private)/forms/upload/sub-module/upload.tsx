"use client";

import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") return setError("Only PDF allowed");
    setError("");
    setFile(f);
  };

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/pdf-detect", { method: "POST", body: form });
    if (!res.ok) setError("Upload failed");

    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-8 shadow-sm">
      <label
        htmlFor="pdf"
        className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <p className="text-gray-600 mb-1">Drag & drop PDF</p>
        <p className="text-gray-400 text-sm">Only PDF files</p>
      </label>

      <input id="pdf" type="file" accept="application/pdf" className="hidden" onChange={onSelect} />

      {file && <p className="mt-3 text-sm text-gray-700">Selected: <b>{file.name}</b></p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
        onClick={upload}
        disabled={!file || loading}
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>
    </div>
  );
}
