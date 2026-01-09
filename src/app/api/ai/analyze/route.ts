import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/geminiText";

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

    if (!input.trim()) {
      return NextResponse.json(
        { success: false, message: "Empty input" },
        { status: 422 }
      );
    }

    let result;

    switch (source) {
      case "pdf":
        input = data.text;
        break;

      case "manual":
        input = Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        break;

      case "prompt":
        input = data;
        result = await analyzeWithGemini(input);
        break;
    }



    // const result = await analyzeWithGemini(input);

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
