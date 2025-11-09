import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Get the model
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-pro" });

export const generateResponse = async (prompt: string) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    throw error;
  }
};

export const generateChatResponse = async (history: Array<{ role: string; parts: string }>, message: string) => {
  try {
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating chat response from Gemini:", error);
    throw error;
  }
};