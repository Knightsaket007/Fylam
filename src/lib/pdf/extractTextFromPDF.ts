import type { Buffer } from "buffer";
import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });

  const result = await parser.getText({ first: 5 });

  await parser.destroy(); // cleanup

  return result.text || "";
}
