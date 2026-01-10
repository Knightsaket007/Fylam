import pdf from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer, {
    max: 5, //=-=-=-=-=-=-=-- pages limit -=-=-=-=-=-=-//
  });
  return data.text || "";
}
