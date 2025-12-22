"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FieldType = "text" | "number" | "date";

type Field = {
  id: string;
  label: string;
  type: FieldType;
  value?: string;
};

export default function DynamicForm({
  initialFields = [],
  onSubmit,
}: {
  initialFields?: Field[];
  onSubmit: (data: Record<string, string>) => void;
}) {
  const [fields, setFields] = useState<Field[]>(initialFields);

  const addField = () => {
    setFields((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        label: "New Field",
        type: "text",
      },
    ]);
  };

  const update = (id: string, key: keyof Field, value: string) => {
    setFields((p) =>
      p.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  const submit = () => {
    const data: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.value) data[f.label] = f.value;
    });
    onSubmit(data);
  };

  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      {fields.map((f) => (
        <div key={f.id} className="flex gap-2">
          <Input
            value={f.label}
            onChange={(e) => update(f.id, "label", e.target.value)}
            className="w-1/3"
          />

         

          <Select onValueChange={(value) => update(f.id, "type", value as FieldType)}>
            <SelectTrigger value={f.type} className="w-[180px]" >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type={f.type}
            placeholder={f.label}
            onChange={(e) => update(f.id, "value", e.target.value)}
          />
        </div>
      ))}

      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={addField}>
          Add Field
        </Button>

        <Button onClick={submit}>Continue</Button>
      </div>
    </div>
  );
}
