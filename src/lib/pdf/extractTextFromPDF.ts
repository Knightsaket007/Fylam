
export async function extractTextFromPDF(buffer: Buffer) {
  const mod = await import("pdf-parse");
  const pdf = mod.default; 

  const data = await pdf(buffer, { max: 3 });
  return data.text;
}
