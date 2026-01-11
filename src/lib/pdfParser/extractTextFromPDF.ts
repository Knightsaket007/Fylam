export async function extractTextFromPDF(
  buffer: Buffer
): Promise<string> {
  const pdf = (await import("pdf-parse")).default;

  const data = await pdf(buffer, {
    max: 5,
  });

  return data.text || "";
}
