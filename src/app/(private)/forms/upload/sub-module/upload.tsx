"use client";

import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (f?: File) => {
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

    const res = await fetch("/api/pdf-detect", {
      method: "POST",
      body: form,
    });

    if (!res.ok) setError("Upload failed");
    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-8 shadow-sm">
      <label
        htmlFor="pdf"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <p className="mb-1 text-gray-600">Drag & drop PDF</p>
        <p className="text-sm text-gray-400">Only PDF files</p>
      </label>

      <input
        id="pdf"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {file && (
        <p className="mt-3 text-sm text-gray-700">
          Selected: <b>{file.name}</b>
        </p>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        onClick={upload}
        disabled={!file || loading}
        className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>
    </div>
  );
}
