import { createGoogleGenerativeAI } from "@ai-sdk/google";

const geminiProvider = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const model = geminiProvider("gemini-2.5-flash-preview-04-17");
