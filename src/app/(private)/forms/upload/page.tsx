"use client"

import UploadBox from "@/app/(private)/forms/upload/sub-module/upload/upload";
import Alert from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DynamicForm from "./sub-module/fields/DynamicForm";
import showAlert from "@/components/shared/Alert";
import PromptBox from "./sub-module/promptBox/PromptBox";


const initalField = {
  id: crypto.randomUUID(),
  label: "New Field 1",
  type: "text" as FieldType,
  labelerror: false,
}

export default function UploadPage() {

  const [mode, setMode] = useState<"upload" | "prompt" | "manual">("upload");
  const [fields, setFields] = useState<Field[]>([initalField]);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);


  const showCustAlert = () => {
    console.log('inside alert')
    showAlert({
      title: "hello world",
      description: "jnsns ksnfkfnkd afnask",
      onConfirm: () => {
        // console.log('vajj')
      },
      isopen: true,
    })
  }


  // const submit = async () => {
  //   if (!prompt.trim()) return;

  //   console.log('submit prompt...', prompt)
  //   // setLoading(true);

  //   const res = await fetch("/api/ai/analyze", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       source: "prompt",
  //       data: prompt,
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log('res data..', data)

  //   // setLoading(false);

  //   if (!res.ok || !data.success) {
  //     // toast.error(data.message || "AI failed");
  //     return;
  //   }

  //   console.log("AI result:", data.result);
  //   // toast.success("Analysis complete");
  // };


  const submit = async () => {
    let payload;

    if (mode === "prompt") {
      if (!prompt.trim()) return;
      payload = { source: "prompt", data: prompt };
    }

    if (mode === "upload") {
      if (!selectedPDF) return;

      const form = new FormData();
      form.append("file", selectedPDF);

      const res = await fetch("/api/ai/analyze-pdf", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      console.log("PDF AI result:", data);
      return;
    }

    if (mode === "manual") {
      // manual ka payload baad me
      return;
    }

    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("AI result:", data);
  };


  return (
    <>

      <Button onClick={showCustAlert}>Click Alert</Button>

      <div className="flex gap-2 mb-6">
        <Button
          variant={mode === "upload" ? "default" : "outline"}
          onClick={() => setMode("upload")}
        >
          Upload PDF
        </Button>

        <Button
          variant={mode === "prompt" ? "default" : "outline"}
          onClick={() => setMode("prompt")}
        >
          Prompt
        </Button>

        <Button
          variant={mode === "manual" ? "default" : "outline"}
          onClick={() => setMode("manual")}
        >
          Enter Manually
        </Button>
      </div>

      {mode === "upload"
        ? <UploadBox
          file={selectedPDF}
          setFile={setSelectedPDF}
          uploadPdf={submit}
        />
        :
        (mode === "prompt") ?

          <PromptBox
            value={prompt}
            setValue={setPrompt}
            onSubmit={submit} />

          :
          <DynamicForm
            onSubmit={(data) => {
              console.log("Manual data:", data);
            }}
            setFields={setFields}
            fields={fields}
          />

      }

    </>
  )
}
