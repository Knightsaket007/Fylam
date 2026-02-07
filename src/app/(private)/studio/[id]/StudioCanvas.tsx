"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import DraggableField from "./DraggableField";

export default function StudioCanvas() {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  type Field = {
    x: number;
    y: number;
    text: string;
  };

  type Fields = Record<UniqueIdentifier, Field>;

  const [fields, setFields] = useState<Fields>({
    name: { x: 0, y: 0, text: "Saket Sourav" },
    date: { x: 0, y: 80, text: "03 Feb 2026" },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setFields((prev) => ({
      ...prev,
      [active.id]: {
        ...prev[active.id],
        x: prev[active.id].x + delta.x,
        y: prev[active.id].y + delta.y,
      },
    }));
  };

  const handleTextChange = (id: string, value: string) => {
  setFields((prev) => ({
    ...prev,
    [id]: {
      ...prev[id],
      text: value,
    },
  }));
};

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
        {Object.entries(fields).map(([id, field]) => (
          <DraggableField
            key={id}
            id={id}
            text={field.text}
            x={field.x}
            y={field.y}
            onChange={handleTextChange}
          />
        ))}
      </div>
    </DndContext>
  );
}
