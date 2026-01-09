import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzePromptWithGemini(input: string) {
  const model = "gemini-2.5-flash";
  const maxRetries = 1;
  let attempt = 0;

  while (attempt <= maxRetries) {
    attempt++;
    try {
      const res = await ai.models.generateContent({
        model,
        contents: `
You are an expert government form assistant.
Rules:
- ONLY valid JSON
- No markdown
- No explanation
- No guessing
Format:
{"purpose": string,"fields":[{"name": string,"value": string | null}],"missing": string[]}
Input:
${input.slice(0, 1500)}
        `,
      });

      const candidates = res?.candidates;
      let text: string | undefined;

      if (candidates && candidates.length > 0) {
        
        const first = candidates[0];
        if (Array.isArray(first.content)) {
          text = first.content.map(p => (p.parts ? p.parts.map((pp: { text: string }) => pp.text).join("\n") : "")).join("\n");
        }
      }

      text ??= res?.text;

      if (!text) {
        if (attempt > maxRetries) throw new Error(JSON.stringify(res));
        continue;
      }

      try {
        return JSON.parse(text.trim());
      } catch {
        if (attempt > maxRetries) throw new Error("Failed to parse JSON: " + text);
        continue;
      }
    } catch (err) {
      if (attempt > maxRetries) throw err;
    }
  }
  throw new Error("Gemini failed after retries");
}
