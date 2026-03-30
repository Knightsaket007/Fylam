"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

type DraggableItemProps = {
  id: string;
  x: number;
  y: number;
  width?: number;

  children: React.ReactNode;

  onResize?: (id: string, width: number) => void;
  onHeightChange?: (id: string, height: number) => void;
};

export default function DraggableItem({
  id,
  x,
  y,
  width,
  children,
  onResize,
  onHeightChange,
}: DraggableItemProps) {

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };

  // height tracking (optional)
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || !onHeightChange) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      onHeightChange(id, rect.height);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // resize handler (optional)
  const startResize = (e: React.MouseEvent) => {
    if (!onResize || !width) return;

    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;

    const onMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      onResize(id, Math.max(40, newWidth));
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
    >

      {/* 🔥 DRAG HANDLE */}
      <button
        {...listeners}
        {...attributes}
        className="
          absolute
          -top-3 left-1/2 -translate-x-1/2
          opacity-0 group-hover:opacity-100
          cursor-grab
          bg-white border rounded-md shadow p-1 z-50
        "
      >
        <GripVertical size={14} />
      </button>

      {/* 🔥 CONTENT */}
      <div style={{ width }}>
        {children}
      </div>

      {/* 🔥 RESIZE (optional) */}
      {onResize && width && (
        <div
          onMouseDown={startResize}
          className="
            absolute
            right-[-5px]
            top-0
            h-full
            w-2
            cursor-ew-resize
            opacity-0
            group-hover:opacity-100
          "
        />
      )}
    </div>
  );
}