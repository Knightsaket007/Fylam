"use client"

import UploadBox from "@/app/(private)/forms/upload/sub-module/upload";
import Alert from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DynamicForm from "./sub-module/DynamicForm";

export default function UploadPage() {

  const [openAlert, setopenAlert] = useState(true);
  const [mode, setMode] = useState<"upload" | "manual">("upload");


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


      {/* <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
        <h1 className="text-2xl font-semibold mb-2">Upload Your PDF</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Upload your PDF and let Fylam detect the fields automatically.
        </p>

        <div className="w-full max-w-lg">
          <UploadBox />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Supported: Visa, Tax, Insurance forms. Max file size 10MB.
        </div>
      </div> */}

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

{mode === "upload" ? <UploadBox /> : <DynamicForm  onSubmit={(data) => {
    console.log("Manual data:", data);
  }}/>}


    </>
  )
}
