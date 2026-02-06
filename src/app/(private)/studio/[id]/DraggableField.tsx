"use client";

import { useDraggable } from "@dnd-kit/core";

type DraggableFieldProps = {
  id: string;
  text: string;
  x: number;
  y: number;
};

export default function DraggableField({ id, text, x, y }: DraggableFieldProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    cursor: "grab",
    padding: "2px 10px",
    background: "#fff",
    border: "1px solid #aaa",
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {text}
    </div>
  );
}
