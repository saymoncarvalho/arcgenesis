import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a Senior Blockchain Engineer and Mentor specializing in Circle's "Arc" network and the Ethereum ecosystem.
The user is a complete beginner ("never developed anything before").
Your mission is:
1. Explain complex concepts (Blockchain, DApp, Smart Contracts, Gas, Wallets) in an extremely simple and educational way.
2. Provide clear code examples (Solidity for contracts, React/Ethers.js for frontend).
3. Be encouraging and patient.
4. Focus on security and best practices from the start.
5. If the user asks about "Circle's Arc network", explain that it is an institutional layer, but the development principles (EVM) are similar to Ethereum.
6. ALWAYS respond in English.
`;

export const sendMessageToGemini = async (message: string, history: string[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a context-aware prompt
    const fullPrompt = `
      Conversation History:
      ${history.join('\n')}
      
      New user question: "${message}"
      
      Respond helpfully, formatting code blocks with markdown if necessary. Keep the tone professional yet accessible.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Sorry, I couldn't process your request at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "An error occurred while trying to connect with the intelligent assistant. Please check your API key or try again later.";
  }
};