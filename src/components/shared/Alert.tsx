"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { createRoot } from "react-dom/client";

export interface AlertProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isopen?: boolean;
}

function Alert({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isopen = true,
  onClose,
}: AlertProps & { onClose: () => void }) {
  return (
    <AlertDialog open={isopen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export default function showAlert({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: AlertProps) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const root = createRoot(div);

  const handleClose = () => {
    root.unmount();
    div.remove();
  };

 root.render(
  <Alert
    title={title}
    description={description}
    confirmText={confirmText}
    cancelText={cancelText}
    isopen={true}
    onConfirm={() => {
      onConfirm();
      handleClose();
    }}
    onClose={handleClose}
  />
);

}
