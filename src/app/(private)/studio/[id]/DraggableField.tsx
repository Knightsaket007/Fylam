"use client";

import { useDraggable } from "@dnd-kit/core";

export default function DraggableField({ id, text }:{id:string, text:string}) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const style = {
    position: "absolute",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    padding: "6px 10px",
    background: "white",
    border: "1px solid #ccc",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {text}
    </div>
  );
}
