"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { getGripPosition } from "@/utils/studio/edgeDetection";


type DraggableFieldProps = {
  id: string;
  text: string;
  x: number;
  y: number;
  onChange: (id: string, value: string) => void;
  width: number;
  onResize: (id: string, width: number) => void
};

export default function DraggableField({
  id,
  text,
  x,
  y,
  onChange,
  width,
  onResize,

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
  const CANVAS_WIDTH = 794;
  const CANVAS_HEIGHT = 1123;

  const isNearTop = y < EDGE_PADDING;
  const isNearLeft = x < EDGE_PADDING;
  const isNearRight = x > CANVAS_WIDTH - EDGE_PADDING - width;
  const isNearBottom = y > CANVAS_HEIGHT - EDGE_PADDING - 40;

  // /======---= grip position logic =--==-=-=-//
  let gripPosition = "-top-8 left-1/2 -translate-x-1/2";

  if (isNearTop) {
    gripPosition = "top-1/2 -translate-y-1/2 -right-8";
  }

  if (isNearTop && isNearLeft) {
    gripPosition = "-bottom-8 left-0";
  }
  // /======---= grip position logic Endedd =--==-=-=-//


  // =--==---= Resize Function handler -=-=-=-=-///
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;

    const onMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);

      onResize(id, Math.max(40, newWidth)); // minimum width
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };


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
        style={{ width }}
        className="
           min-w-[40px]
           px-2
           py-1
           rounded-sm
           whitespace-pre-wrap
           overflow-wrap-anywhere
           bg-transparent
           hover:outline-1
           outline-gray-400
         "
      >
        {text}
      </div>


      {/*=--=-=--==--==- CUSTOM RESIZE HANDLE -=-==--=-=-=-=*/}
      <div
        onMouseDown={startResize}
        className="
           absolute
           right-[-6px]
           top-0
           h-full
           w-3
           cursor-ew-resize
           opacity-0
           group-hover:opacity-100
           flex
           items-center
           justify-center
         "
      >
        <div className="h-6 w-[3px] bg-gray-400 rounded-full" />
      </div>


    </div>
  );
}
