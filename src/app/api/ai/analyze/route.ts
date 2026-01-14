import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/geminiAnalysis";
import { extractTextFromPDF } from "@/lib/pdfParser/extractTextFromPDF";

export async function POST(req: NextRequest) {
  try {
    let source: string | null = null;
    let input = "";

    const contentType = req.headers.get("content-type") || "";

    // ===== UPLOAD (FormData) =====
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      source = form.get("source") as string;
      const file = form.get("file");

      if (source !== "upload" || !(file instanceof File)) {
        return NextResponse.json(
          { success: false, message: "Invalid upload payload" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      input = await extractTextFromPDF(buffer);
    }

    // ===== PROMPT / MANUAL (JSON) =====
    else {
      const body = await req.json();
      source = body?.source;

      if (!source) {
        return NextResponse.json(
          { success: false, message: "Invalid payload" },
          { status: 400 }
        );
      }

      if (source === "prompt") {
        input = body.data;
      }

      if (source === "manual") {
        input = Object.entries(body.data || {})
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
      }
    }

    if (!input || !input.trim()) {
      return NextResponse.json(
        { success: false, message: "Empty input" },
        { status: 422 }
      );
    }

    const result = await analyzeWithGemini(input);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("AI ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        message: "AI could not process the document",
        debug: String(err),
      },
      { status: 500 }
    );
  }
}
