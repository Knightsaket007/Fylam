"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  uploadPdf:()=>void;
  loading:boolean
};

export default function UploadBox({ file, setFile, uploadPdf, loading }: Props) {
  const [error, setError] = useState("");

  const handleFile = (f?: File) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Only PDF allowed");
      return;
    }
    setError("");
    setFile(f);
  };

  const upload = async () => {
    // uploadPdf()
    console.log('file...', file)
    if (!file) return;
    // setLoading(true);

    // const form = new FormData();
    // form.append("file", file);

    setFile(file as File)
    uploadPdf()


    // const res = await fetch("/api/pdf-detect", {
    //   method: "POST",
    //   body: form,
    // });

    // if (!res.ok) setError("Upload failed");
    // setLoading(false);
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

      <Button
        onClick={upload}
        disabled={!file || loading}
        className="mt-6 w-full"
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </Button>
    </div>
  );
}
