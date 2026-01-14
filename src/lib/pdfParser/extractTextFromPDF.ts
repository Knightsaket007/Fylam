import type { Buffer } from "buffer";

export async function extractTextFromPDF(
  buffer: Buffer,
  maxPages = 5
): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;

  const data = await pdfParse(buffer, {
    max: maxPages,
  });

  return data.text?.trim() || "";
}
