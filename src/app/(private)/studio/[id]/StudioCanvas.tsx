"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useDroppable } from "@dnd-kit/core";
import DraggableField from "./DraggableField";
import { applyVerticalPush } from "@/utils/studio/layoutEngine";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useStudio } from "./context/StudioContext";
import { getLastFieldId } from "@/utils/studio/getLastField";
import DraggableWrapper from "./draggable/Draggable";

export default function StudioCanvas() {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  type Field = {
    x: number;
    y: number;
    text: string;
    width: number
    height: number;
  };

  type Fields = Record<UniqueIdentifier, Field>;

  // const [fields, setFields] = useState<Fields>({
  //   10: { x: 0, y: 0, text: "Saket Sourav", width: 150, height: 40, },
  //   date: { x: 0, y: 80, text: "03 Feb 2026", width: 150, height: 40, },
  // });

  const { fields, setFields, activeField, setActiveField } = useStudio();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setFields((prev) => ({
      ...prev,
      [active.id]: {
        ...prev[active.id],
        x: prev[active.id].x + delta.x,
        y: prev[active.id].y + delta.y,
      },
    }));
  };


  const handleTextChange = (id: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        text: value,
      },
    }));
  };


  const handleResize = (id: string, width: number) => {
    setFields(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        width,
      },
    }));
  };


  const handleHeightChange = (id: string, newHeight: number) => {
    setFields(prev =>
      applyVerticalPush(prev, id, newHeight)
    );
  };


  const generateId = () => crypto.randomUUID();

  const addNewField = () => {
    const id = generateId();


    setFields(prev => ({
      ...prev,
      [id]: {
        x: (activeField?.maxX ?? 0),
        y: (activeField?.maxY ?? 0) + 20,
        width: 150,
        height: 40,
        text: "New Text",
      }
    }));
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div
        ref={setNodeRef}
        style={{
          position: "relative",
          width: "794px",
          height: "1123px",
          border: "1px solid #ddd",
          margin: "auto",
          overflow: "hidden",
          // maxWidth: "100%",
          flexShrink: 0,
          borderRadius: "10px",
        }}
      >
        {Object.entries(fields).map(([id, field]) => (
          <DraggableField
            key={id}
            id={id}
            text={field.text}
            x={field.x}
            y={field.y}
            isActive={activeField?.lastId === id}
            setActiveField={setActiveField}
            width={field.width}
            onChange={handleTextChange}
            onResize={handleResize}
            onHeightChange={handleHeightChange}
          />
        ))}



        {/* =---=- Image testing =-=-=-=-=- */}
        {Object.entries(fields).map(([id, field]) => (
          <DraggableWrapper
            key={id}
            id={id}
            x={field.x}
            y={field.y}
            width={field.width}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2AsWE5i8BSgaQn8aWEV97tRULftod6Ca4ikmegakxwAMtz7lc9I5VZo&s=10" className="w-full" />
          </DraggableWrapper>
        ))}
        {/* =---=- Image testing =-=-=-=-=- */}


        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={addNewField}
              className="
               fixed
               bottom-6
               right-6
               rounded-full
               shadow-lg
             "
            >
              + Add Text
            </Button>

          </TooltipTrigger>
          <TooltipContent>
            <p>Add new text</p>
          </TooltipContent>
        </Tooltip>



      </div>
    </DndContext>


  );
}
