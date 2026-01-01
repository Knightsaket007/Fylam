"use client"

import UploadBox from "@/app/(private)/forms/upload/sub-module/upload";
import Alert from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DynamicForm from "./sub-module/DynamicForm";
import showAlert from "@/components/shared/Alert";


const initalField = {
  id: crypto.randomUUID(),
  label: "New Field 1",
  type: "text" as FieldType,
  labelerror: false,
}

export default function UploadPage() {

  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [fields, setFields] = useState<Field[]>([initalField]);

  const showCustAlert=()=>{
    console.log('inside alert')
    showAlert({
      title:"hello world",
      description:"jnsns ksnfkfnkd afnask",
      onConfirm:()=>{
        // console.log('vajj')
      },
      isopen:true,
    })
  }
   

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
