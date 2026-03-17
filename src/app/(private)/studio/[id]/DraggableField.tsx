"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { getGripPosition } from "@/utils/studio/edgeDetection";
import { useLayoutEffect, useRef, useState } from "react";


type DraggableFieldProps = {
  id: string;
  text: string;
  x: number;
  y: number;
  isActive: boolean;
  setActiveField: React.Dispatch<React.SetStateAction< ActiveField | null>>;
  onChange: (id: string, value: string) => void;
  width: number;
  onResize: (id: string, width: number) => void
  onHeightChange: (id: string, height: number) => void;
};

export default function DraggableField({
  id,
  text,
  x,
  y,
  isActive,
  setActiveField,
  onChange,
  width,
  onResize,
  onHeightChange

}: DraggableFieldProps) {

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };



  // --==--==-=--= Grip EDGE DETECTION -=---=///
  const fieldRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 100,
    height: 40,
  });

  useLayoutEffect(() => {
    if (!fieldRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;

      setSize({
        width: rect.width,
        height: rect.height,
      });

      onHeightChange(id, rect.height);
    });

    observer.observe(fieldRef.current);

    return () => observer.disconnect();
  }, []);


  const gripPosition = getGripPosition({
    x,
    y,
    fieldWidth: size.width,
    fieldHeight: size.height,
    canvasWidth: 794,
    canvasHeight: 1123,
  });

  // /======---= grip EDGE DETECTION logic Endedd =--==-=-=-//


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
    <div ref={(node) => {
      setNodeRef(node);
      fieldRef.current = node;
    }}
      style={style}
      className="absolute group">

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
        onClick={(e) => {
          e.stopPropagation(); 
          setActiveField({
             lastId: id ,
             lastText: text,
             maxX: x,
             maxY: y 
          });
          console.log("Active Field set to:", { id, text, x, y });
        }}
        className="
           min-w-10
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
