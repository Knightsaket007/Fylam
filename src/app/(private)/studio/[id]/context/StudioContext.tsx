"use client";

import { createContext, useContext, useState } from "react";

type FieldType = {
    id: string;
    text: string;
    x: number;
    y: number;
    height: number;
    fontSize: number;
    color: string;
};

type StudioContextType = {
    fields: FieldType[];
    setFields: React.Dispatch<React.SetStateAction<FieldType[]>>;
    activeId: string | null;
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
};

const StudioContext = createContext<StudioContextType | null>(null);

export const StudioProvider = ({ children }: { children: React.ReactNode }) => {
    const [fields, setFields] = useState<FieldType[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <StudioContext.Provider value={{ fields, setFields, activeId, setActiveId }}>
            {children}
        </StudioContext.Provider>
    );
};

export const useStudio = () => {
    const context = useContext(StudioContext);
    if (!context) throw new Error("useStudio must be used inside StudioProvider");
    return context;
};