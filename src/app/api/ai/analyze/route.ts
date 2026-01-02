import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, data } = body;

    if (!source || !data) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    let input = "";

    if (source === "pdf") {
      input = data.text;
    }

    if (source === "manual") {
      input = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
    }

    if (source === "prompt") {
      input = data;
    }

    if (!input) {
      return NextResponse.json(
        { error: "Empty input" },
        { status: 400 }
      );
    }

    const result = await analyzeWithGemini(input);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "AI processing failed" },
      { status: 500 }
    );
  }
}
