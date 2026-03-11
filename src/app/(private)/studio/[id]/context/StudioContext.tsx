"use client";

import { createContext, useContext, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

type Field = {
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
};

type Fields = Record<UniqueIdentifier, Field>;

type StudioContextType = {
  fields: Fields;
  setFields: React.Dispatch<React.SetStateAction<Fields>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  nextTextPosition: {x:number, y:number} | null;
  setNextTextPosition: React.Dispatch<React.SetStateAction< {x:number, y:number}| null>>;
};

const StudioContext = createContext<StudioContextType | null>(null);

export const StudioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fields, setFields] = useState<Fields>({
    10: { x: 0, y: 0, text: "Saket Sourav", width: 150, height: 40 },
    date: { x: 0, y: 80, text: "03 Feb 2026", width: 150, height: 40 },
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [nextTextPosition, setNextTextPosition] = useState<{x:number| 0, y:number | 0} | null>({x:100, y:100});

  return (
    <StudioContext.Provider
      value={{ fields, setFields, activeId, setActiveId, nextTextPosition, setNextTextPosition}}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used inside StudioProvider");
  }
  return context;
};