"use client";

import { createContext, useContext, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

type Field = {
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  src?: string;
  type?: "text" | "image" | "line";
};

type Fields = Record<UniqueIdentifier, Field>;

type StudioContextType = {
  fields: Fields;
  setFields: React.Dispatch<React.SetStateAction<Fields>>;
  activeField: ActiveField | null;
  setActiveField: React.Dispatch<React.SetStateAction< ActiveField | null>>;
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

  const [activeField, setActiveField] = useState<ActiveField | null>(null);

  return (
    <StudioContext.Provider
      value={{ fields, setFields, activeField, setActiveField }}
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