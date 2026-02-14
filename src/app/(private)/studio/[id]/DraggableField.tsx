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

  // --==--==-=--= EDGE DETECTION -=---=///
  const EDGE_PADDING = 20;
  const isNearTop = y < EDGE_PADDING;
  const isNearLeft = x < EDGE_PADDING;

  // /======---= grip position logic =--==-=-=-//
  let gripPosition = "-top-8 left-1/2 -translate-x-1/2";

  if (isNearTop) {
    gripPosition = "top-1/2 -translate-y-1/2 -right-8";
  }

  if (isNearTop && isNearLeft) {
    gripPosition = "-bottom-8 left-0";
  }

  return (
    <div ref={setNodeRef} style={style} className="absolute group">

      {/* =-=-=-=-= DRAG HANDLE =-=-=-=-==*/}
      <button
        {...listeners}
        {...attributes}
        className={`
          absolute
          ${gripPosition}
          opacity-0 group-hover:opacity-100
          cursor-grab
          bg-white
          border
          rounded-md
          shadow-md
          p-1
          z-50
        `}
      >
        <GripVertical size={16} />
      </button>


      {/* -=-=-=--=-=-= TEXT -==--==-*/}
      <div
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
          outline-none
          whitespace-pre-wrap

          resize: horizontal;
overflow: hidden;
min-width: 50px;
max-width: 100%;
        "
      >
        {text}
      </div>
    </div>
  );
}
