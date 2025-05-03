import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "How does AI work?",
  });
  
  const topic = response.text;
  console.log(topic);
  return topic;
//   console.log(topic);
}

await main();

export default main;