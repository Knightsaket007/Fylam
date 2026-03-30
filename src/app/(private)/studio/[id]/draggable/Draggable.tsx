"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { getGripPosition } from "@/utils/studio/edgeDetection";

type DraggableWrapperProps = {
  id: string;
  x: number;
  y: number;
  width: number;
  isActive: boolean;

  children: React.ReactNode;

  setActive: (id: string) => void;
  onResize?: (id: string, width: number) => void;
  onHeightChange?: (id: string, height: number) => void;
};

export default function DraggableWrapper({
  id,
  x,
  y,
  width,
  isActive,
  children,
  setActive,
  onResize,
  onHeightChange,
}: DraggableWrapperProps) {
  
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };

  // size tracking
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 100, height: 40 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;

      setSize({
        width: rect.width,
        height: rect.height,
      });

      onHeightChange?.(id, rect.height);
    });

    observer.observe(ref.current);
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

  // resize
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;

    const onMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      onResize?.(id, Math.max(40, newWidth));
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        ref.current = node;
      }}
      style={style}
      className="absolute group"
      onClick={(e) => {
        e.stopPropagation();
        setActive(id);
      }}
    >

      {/* 🔥 DRAG HANDLE */}
      <button
        {...listeners}
        {...attributes}
        className={`absolute ${gripPosition} opacity-0 group-hover:opacity-100 cursor-grab bg-white border rounded-md shadow-md p-1 z-50`}
      >
        <GripVertical size={16} />
      </button>

      {/* 🔥 ACTUAL CONTENT */}
      <div style={{ width }}>
        {children}
      </div>

      {/* 🔥 RESIZE HANDLE */}
      {onResize && (
        <div
          onMouseDown={startResize}
          className="absolute right-[-6px] top-0 h-full w-3 cursor-ew-resize opacity-0 group-hover:opacity-100 flex items-center justify-center"
        >
          <div className="h-6 w-[3px] bg-gray-400 rounded-full" />
        </div>
      )}
    </div>
  );
}