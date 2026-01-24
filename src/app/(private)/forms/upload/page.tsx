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

type ModeValueMap = {
  upload: File | null;
  prompt: string;
  manual: string;
};


export default function UploadPage() {

  const [mode, setMode] = useState<"upload" | "prompt" | "manual">("upload");
  const [fields, setFields] = useState<Field[]>([initalField]);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const showCustAlert = () => {
    console.log('inside alert')
    showAlert({
      title: "hello world",
      description: "jnsns ksnfkfnkd afnask",
      onConfirm: () => {
      },
      isopen: true,
    })
  }

  const modeObj: ModeValueMap = {
    upload: selectedPDF,
    prompt,
    manual: prompt,
  };



  // const submit = async () => {
  //   setLoading(true);

  //   const value = modeObj[mode];
  //   if (!value) {
  //     setLoading(false);
  //     return;
  //   }

  //   let res: Response;

  //   if (mode === "upload") {
  //     const form = new FormData();
  //     form.append("source", "upload");
  //     form.append("file", value as File);

  //     res = await fetch("/api/ai/analyze", {
  //       method: "POST",
  //       body: form,
  //     });
  //   } else {
  //     res = await fetch("/api/ai/analyze", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         source: mode,
  //         data: value,
  //       }),
  //     });
  //   }

  //   const data = await res.json();
  //   setLoading(false);

  //   if (!res.ok || !data.success) return;

  //   console.log("AI result:", data.result);
  // };

const submit = async () => {
  setLoading(true);

  const value = modeObj[mode];
  if (!value) {
    setLoading(false);
    return;
  }

  try {
    let res: Response;

    // --=-=-=--==-=-=- PDF UPLOAD =--=-=-=-///
    if (mode === "upload") {
      const file = value as File;

      const form = new FormData();
      form.append("source", "upload");
      form.append("file", file);

      res = await fetch("/api/ai/analyze", {
        method: "POST",
        body: form,
      });
    }
     // --=-=-=--==-=-=- Other modEs =--=-=-=-///
    else {
      console.log('value...', value)
      res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: mode,
          data: value,
        }),
      });
    }

    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data.success) {
      console.error(data?.message);
      return;
    }

    console.log("AI result:", data.result);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
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
          loading={loading}
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
