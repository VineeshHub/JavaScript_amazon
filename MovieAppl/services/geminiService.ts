import { GoogleGenAI } from "@google/genai";
import { MOVIES } from '../constants';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMovieRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const movieListString = MOVIES.map(m => `${m.title} (${m.genre.join(', ')} - Rating: ${m.rating})`).join('\n');
    
    const prompt = `
      You are a friendly movie concierge for an app called CineMate. 
      The user is asking: "${userQuery}".
      
      Here are the movies currently available in the app:
      ${movieListString}
      
      Please recommend one or two movies from this list that best match the user's request. 
      If the request is unrelated to movies, politely steer them back to movies.
      Keep the response short, engaging, and under 50 words. Do not use markdown formatting like bold or italics.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I couldn't find a recommendation right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the movie database. Please try again later.";
  }
};
