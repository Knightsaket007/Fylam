import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;



if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeWithGemini(input: string) {
    console.log("apiKey...", apiKey)
    try {
        const model = genAI.getGenerativeModel({
            model: "models/gemini-1.0-pro"
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
        console.error("Gemini error:", e);
        throw e; 
    }
}
