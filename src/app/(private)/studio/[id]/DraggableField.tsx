"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type DraggableFieldProps = {
  id: string;
  text: string;
  x: number;
  y: number;
  onChange: (id: string, value: string) => void;
};

export default function DraggableField({
  id,
  text,
  x,
  y,
  onChange,
}: DraggableFieldProps) {
  
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-2"
    >
      
      {/*=-=-=-=- DRAG HANDLE =-=-=-=-= */}
      <button
        {...listeners}
        {...attributes}
        className="
          opacity-0
          group-hover:opacity-100
          cursor-grab
          bg-white
          border
          rounded
          shadow-sm
          p-1
        "
      >
        <GripVertical size={16} />
      </button>

      {/* -==-=-=-Editable text-=-=-==- */}
      <div
        // contentEditable
        contentEditable="plaintext-only"
        suppressContentEditableWarning
        onBlur={(e) =>
          onChange(id, e.currentTarget.textContent || "")
        }
        className="
          min-w-[40px]
          px-2
          py-[2px]
          bg-transparent
          border border-transparent
          hover:border-gray-300
          focus:border-blue-400
          outline-none
        "
      >
        {text}
      </div>
    </div>
  );
}
