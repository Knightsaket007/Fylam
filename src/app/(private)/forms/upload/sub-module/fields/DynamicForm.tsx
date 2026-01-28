"use client";

import React, { useState } from "react";
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
  // initialFields = [],
  onSubmit,
  setFields,
  fields
}: {
  // initialFields?: Field[];
  onSubmit: (data: Record<string, string>) => void;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>
  fields: Field[]
}) {

  // const [fields, setFields] = useState<Field[]>(initialFields);
  const [fieldCount, setFieldCount] = useState(fields.length);


  const addField = () => {

    setFields((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        label: `New Field ${fieldCount + 1}`,
        type: "text",
        labelerror: false,
      },
    ]);

    setFieldCount((c) => c + 1);
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };



  const update = (id: string, key: keyof Field, value: string) => {

    let showToast = false;

    setFields((prev) => {
      const isDuplicate =
        key === "label" &&
        prev.some(
          (f) =>
            f.id !== id &&
            f.label.trim().toLowerCase() === value.trim().toLowerCase()
        );

      if (key === "label" && isDuplicate) {
        showToast = true;
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

    if (showToast) {
      toast.warning("Duplicate label", {
        description: "Please write unique label",
      });
    }
  };


  const submit = () => {
    const data: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.value && f.label) {
        console.log("fields...", f)
        data[f.label] = f.value;
      }
      else if (!f.value) {
        toast.warning("Value missing", {
          description: "Please fill the value",
        });
      }
      else if (!f.label) {
        toast.warning("Label missing", {
          description: "Please fill the Label field",
        });
      }
    });
    // console.log("data...", data)
    onSubmit(data);
  };


  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 max-sm:p-3 shadow-sm ">
      <Toaster />

      {fields.map((f) => (
        <div key={f.id} className="flex gap-1 w-full md:items-center">

          <button className="cursor-pointer relative group w-5 h-5 max-sm:!w-9" onClick={() => deleteField(f.id)}>
            <img
              src="https://img.icons8.com/carbon-copy/100/trash.png"
              alt="trash"
              className="absolute inset-0 transition-opacity group-hover:opacity-0"
            />
            <img
              src="https://img.icons8.com/carbon-copy/a3030b/100/trash.png"
              alt="trash red"
              className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100"
            />
          </button>


          <div className="flex gap-2 md:flex-nowrap flex-wrap">
            <Input
              value={f.label}
              onChange={(e) => update(f.id, "label", e.target.value)}
              className={`w-1/3 ${f.labelerror ? "!border-red-500" : ""}`}
            />


            <Select onValueChange={(value) => update(f.id, "type", value as FieldType)}>
              <SelectTrigger value={f.type} className="min-w-[180px] w-1/3" >
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
