"use client";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

// 👇 worker
GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.2.67/legacy/build/pdf.worker.min.js";

export async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  const pdf = await getDocument({ data: buffer }).promise;

  let text = "";

  for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    text +=
      content.items
        .map((item) =>
          "str" in item ? item.str : ""
        )
        .join(" ") + "\n";
  }

  return text.trim();
}
