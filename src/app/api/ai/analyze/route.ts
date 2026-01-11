import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/geminiAnalysis";
import { extractTextFromPDF } from "@/lib/pdfParser/extractTextFromPDF";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, data } = body;

    if (!source || !data) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    let input = "";

    switch (source) {
      case "pdf":
        const buffer =
          typeof data === "string"
            ? Buffer.from(data, "base64")
            : Buffer.from(data);

        input = await extractTextFromPDF(buffer);
        break;

      case "manual":
        input = Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        break;

      case "prompt":
        input = data;
        break;
    }

    if (!input.trim()) {
      return NextResponse.json(
        { success: false, message: "Empty input" },
        { status: 422 }
      );
    }

    const result = await analyzeWithGemini(input);

    return NextResponse.json({
      success: true,
      result,
    });

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
