
import { GoogleGenAI, Type } from "@google/genai";
import { SearchResponse } from "../types";

const MODEL_NAME = 'gemini-3-flash-preview';

export const fetchCompanyData = async (role: string): Promise<SearchResponse> => {
  // Access the API key from environment variables
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("Critical Error: API_KEY is not defined in the environment.");
    throw new Error("Missing API Configuration. Please set the API_KEY variable in your deployment dashboard.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Find 6-8 real companies that are currently hiring for or known for roles like: ${role}. 
    Please provide:
    - Company name
    - Their core product or service
    - The specific role name
    - A contact email address
    - A short description detailing their investment or job offerings in this space.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          companies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                product: { type: Type.STRING },
                role: { type: Type.STRING },
                email: { type: Type.STRING },
                details: { type: Type.STRING },
              },
              required: ["id", "name", "product", "role", "email", "details"],
            },
          },
          insights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                trend: { type: Type.STRING },
              },
              required: ["title", "description", "trend"],
            },
          },
        },
        required: ["companies", "insights"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as SearchResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("The AI service returned data in an unexpected format.");
  }
};
