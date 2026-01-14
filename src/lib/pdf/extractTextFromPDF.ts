import pdf from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer) {
  const data = await pdf(buffer, { max: 5 });
  return data.text || "";
}
