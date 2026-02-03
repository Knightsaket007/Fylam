"use client";

import { DndContext } from "@dnd-kit/core";
import StudioCanvas from "./StudioCanvas";

export default function Page() {
  return (
    <DndContext>
      <StudioCanvas />
    </DndContext>
  );
}
