import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/geminiAnalysis";
import { extractTextFromPDF } from "@/lib/pdf/extractTextFromPDF";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const source = form.get("source");
    const file = form.get("file") as File | null;
    const prompt = form.get("data") as string | null;

    let input = "";

    if (source === "upload") {
      if (!file) throw new Error("No PDF");

      const buffer = Buffer.from(await file.arrayBuffer());
      input = await extractTextFromPDF(buffer);
    }

    if (source === "prompt" && prompt) {
      input = prompt;
    }

    if (!input.trim()) {
      return NextResponse.json(
        { success: false, message: "Empty input" },
        { status: 422 }
      );
    }

    const result = await analyzeWithGemini(input);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "AI failed" },
      { status: 500 }
    );
  }
}
