"use client";

import { useDroppable } from "@dnd-kit/core";
import DraggableField from "./DraggableField";

export default function StudioCanvas() {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        width: "800px",
        height: "1000px",
        border: "1px solid #ddd",
        margin: "auto",
      }}
    >
      <DraggableField id="name" text="Saket Sourav" />
      <DraggableField id="date" text="03 Feb 2026" />
    </div>
  );
}
