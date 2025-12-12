"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setError("");
    setFile(selected);
  }

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/pdf-detect", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      // After upload, redirect or show result
      console.log("Uploaded!");
    } catch (err) {
      setError("Something went wrong during upload.");
    }

    setLoading(false);
  }

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-8 shadow-sm">
      {/* Drag + Drop box */}
      <label
        htmlFor="file-upload"
        className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <p className="text-gray-600 mb-2">Drag & drop your PDF here</p>
        <p className="text-gray-400 text-sm">(Only PDF files supported)</p>
      </label>

      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* File selected */}
      {file && (
        <p className="mt-3 text-sm text-gray-700">
          Selected: <b>{file.name}</b>
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      {/* Upload button */}
      <button
        className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>
    </div>
  );
}
