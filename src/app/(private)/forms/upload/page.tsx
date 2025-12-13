"use client"

import UploadBox from "@/app/(private)/forms/upload/sub-module/upload";
import Alert from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UploadPage() {

   const [openAlert, setopenAlert] = useState(true)

    return (
        <>

            <Alert
                title="Delete Form?"
                description="This cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => console.log("Deleted")}
                isopen={openAlert}
                setisopen={setopenAlert}
            >
                {/* <Button variant="outline" onClick={clickhandler}>Delete File</Button> */}
            </Alert>
            <UploadBox />
        </>
    )
}
