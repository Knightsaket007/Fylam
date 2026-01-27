import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/ai/geminiAnalysis";
import { extractTextFromPDF } from "@/lib/pdf/extractTextFromPDF";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    let input = "";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const source = form.get("source");
      const file = form.get("file") as File | null;
      const prompt = form.get("data") as string | null;

      if (source === "upload" && file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        input = await extractTextFromPDF(buffer);
      } else if (source === "prompt" && prompt) {
        input = prompt;
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      input = body.data || "";
    }

    if (!input.trim()) {
      return NextResponse.json({ success: false, message: "Empty input" }, { status: 422 });
    }

    const result = await analyzeWithGemini(input);

      await prisma.file.create({
      data: {
        input,
        aiResult: result,
        source: contentType.includes("multipart") ? "upload" : "prompt",
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "AI failed" }, { status: 500 });
  }
}

