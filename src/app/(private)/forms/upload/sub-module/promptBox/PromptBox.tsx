"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PromptBox({
  value,
  setValue,
  onSubmit,
}: {
  value: string;
  setValue: (v: string) => void;
  onSubmit: (text: string) => void;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <Textarea
        rows={8}
        placeholder="Describe your details here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="resize-none"
      />

      <Button
        disabled={!value.trim()}
        onClick={() => onSubmit(value)}
        className="w-full"
      >
        Generate
      </Button>
    </div>
  );
}
