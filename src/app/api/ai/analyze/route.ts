import { NextRequest, NextResponse } from "next/server";
import { analyzePromptWithGemini } from "@/lib/ai/geminiText";
import { analyzeFileWithGemini } from "@/lib/ai/geminiFile";

export async function POST(req: NextRequest) {
  try {
    const { source, data } = await req.json();

    if (!source || !data) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    let input = "";

    switch (source) {
      case "pdf":
        input = data.text ?? "";
        break;

      case "manual":
        input = Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        break;

      case "prompt":
        input = data;
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid source type" },
          { status: 400 }
        );
    }

    if (!input.trim()) {
      return NextResponse.json(
        { success: false, message: "Empty input" },
        { status: 422 }
      );
    }

    const result =
      source === "prompt"
        ? await analyzePromptWithGemini(input)
        : await analyzeFileWithGemini(input);

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
