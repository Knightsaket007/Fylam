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
import InputFiledVariation from "./util/InputFiledVariation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


export default function DynamicForm({
  initialFields = [],
  onSubmit,
}: {
  initialFields?: Field[];
  onSubmit: (data: Record<string, string>) => void;
}) {
  const [fields, setFields] = useState<Field[]>(initialFields);

  // const checkvaldity=()=>{
  //   fields.forEach(f=>{
  //     if()
  //   })
  // }

  const addField = () => {

    setFields((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        label: "New Field",
        type: "text",
        labelerror: false,
      },
    ]);
  };


  const update = (id: string, key: keyof Field, value: string) => {
    setFields((prev) => {
      const isDuplicate =
        key === "label" &&
        prev.some(
          (f) =>
            f.id !== id &&
            f.label.trim().toLowerCase() === value.trim().toLowerCase()
        );

      if (key === "label" && isDuplicate) {
        toast.warning("Duplicate label", {
          description: "Please write unique label", 
        })
      }

      return prev.map((f) =>
        f.id === id
          ? {
            ...f,
            [key]: value,
            labelerror: key === "label" ? isDuplicate : f.labelerror,
          }
          : f
      );
    });
  };


  const submit = () => {
    const data: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.value) {
        console.log("fields...", f)
        data[f.label] = f.value;
      }
    });
    console.log("data...", data)
    onSubmit(data);
  };


  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <Toaster />

      {fields.map((f) => (
        <div key={f.id} className="flex gap-2">
          <Input
            value={f.label}
            onChange={(e) => update(f.id, "label", e.target.value)}
            className={`w-1/3 ${f.labelerror ? "!border-red-500" : ""}`}
          />


          <Select onValueChange={(value) => update(f.id, "type", value as FieldType)}>
            <SelectTrigger value={f.type} className="w-[180px]" >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Field types</SelectLabel>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>


          <InputFiledVariation update={update} f={f} onChange={(e) => update(f.id, "value", e.target.value)} />

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
