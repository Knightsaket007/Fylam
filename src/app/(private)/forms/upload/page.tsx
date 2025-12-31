"use client"

import UploadBox from "@/app/(private)/forms/upload/sub-module/upload";
import Alert from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DynamicForm from "./sub-module/DynamicForm";

export default function UploadPage() {

  const [openAlert, setopenAlert] = useState(true);
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [fields, setFields] = useState<Field[]>([]);

  const handleConfirm = () => {
    console.log('hi')
    setopenAlert(false);
  }

  return (
    <>

      <Alert
        title="Delete Form?"
        description="This cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => handleConfirm()}
        isopen={openAlert}
        setisopen={setopenAlert}
      >
      </Alert>

      <div className="flex gap-2 mb-6">
        <Button
          variant={mode === "upload" ? "default" : "outline"}
          onClick={() => setMode("upload")}
        >
          Upload PDF
        </Button>

        <Button
          variant={mode === "manual" ? "default" : "outline"}
          onClick={() => setMode("manual")}
        >
          Enter Manually
        </Button>
      </div>

      {mode === "upload"
        ? <UploadBox />
        :
        <DynamicForm
          onSubmit={(data) => {
            console.log("Manual data:", data);
          }}
          setFields={setFields}
          fields={fields}

        />}


    </>
  )
}
