"use client";

import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties } from "react";

export default function DraggableField({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const style: CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="
        absolute
        px-2 py-1
        bg-white
        border border-gray-300
        rounded-md
        shadow-sm
        cursor-grab active:cursor-grabbing
        select-none
        touch-none
      "
    >
      {text}
    </div>
  );
}
