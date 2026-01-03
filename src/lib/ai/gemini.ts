import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeWithGemini(input: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const prompt = `
You are an expert government form assistant.

Return ONLY valid JSON in this format:
{
  "purpose": string,
  "fields": { "fieldName": "value or null" }[],
  "missing": string[]
}

Input:
${input}
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return JSON.parse(text);
    } catch (e) {
        return {
            error: true,
            message: "AI could not process the document",
        };
    }
}
