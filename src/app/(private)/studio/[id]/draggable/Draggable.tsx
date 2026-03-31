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
  height?: number;

  children: React.ReactNode;

  onResize?: (id: string, width: number, height: number) => void;
  onHeightChange?: (id: string, height: number) => void;
};

export default function DraggableItem({
  id,
  x,
  y,
  width,
  height,
  children,
  onResize,
  onHeightChange,
}: DraggableItemProps) {

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id });

  const ref = useRef<HTMLDivElement>(null);

  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
    width: width,
    height: height,
  };

  // auto height tracking (optional)
  useLayoutEffect(() => {
    if (!ref.current || !onHeightChange) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      onHeightChange(id, rect.height);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 🔥 RESIZE (width + height)
  const startResize = (e: React.MouseEvent) => {
    if (!onResize || !ref.current) return;

    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const startWidth = ref.current.offsetWidth;
    const startHeight = ref.current.offsetHeight;

    const onMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);

      onResize(
        id,
        Math.max(40, newWidth),
        Math.max(40, newHeight)
      );
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
      <div className="w-full h-full">
        {children}
      </div>

      {/* 🔥 CORNER RESIZE HANDLE */}
      {onResize && (
        <div
          onMouseDown={startResize}
          className="
            absolute
            bottom-[-6px]
            right-[-6px]
            h-4
            w-4
            cursor-nwse-resize
            opacity-0
            group-hover:opacity-100
            bg-white
            border
            rounded-sm
            shadow
          "
        />
      )}
    </div>
  );
}