import { GoogleGenerativeAI } from "@google/generative-ai";
import { PortfolioSections } from "../types/portfolio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function parseResume(rawText: string): Promise<PortfolioSections> {
  // Use a stable, specific model endpoint rather than "latest" aliases to avoid 503s.
  // Using gemini-2.5-flash as it is fast, supports JSON mapping, and is available for this account.
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are an expert resume parser and portfolio generator.
Extract information from the provided resume text and map it to the following JSON structure exactly.
Rules:
1. Return ONLY valid JSON – no markdown blocks, no code fences like \`\`\`json.
2. Be concise but descriptive. Enhance bullet points for impact if necessary.
3. If an entire section like 'projects' is missing from the resume, return an empty array [].
4. Date formats should ideally be 'Month Year' or simply 'Year'.

Expected JSON Structure:
{
  "summary": "A 2-3 sentence professional summary highlighting key skills and experience.",
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "startDate": "Jan 2020",
      "endDate": "Present",
      "description": ["Developed feature X", "Optimized Y"]
    }
  ],
  "education": [
    {
      "degree": "B.S. Computer Science",
      "institution": "University Z",
      "startDate": "2016",
      "endDate": "2020"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js"],
  "projects": [
    {
      "name": "E-commerce App",
      "description": "A full-stack app...",
      "url": "https://example.com",
      "technologies": ["React", "Express"]
    }
  ],
  "contact": {
    "email": "user@example.com",
    "phone": "123-456-7890",
    "linkedin": "https://linkedin.com/in/...",
    "github": "https://github.com/...",
    "website": "https://example.com"
  }
}`,
  });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: rawText }],
      },
    ],
    generationConfig: {
      temperature: 0.2, // Low temperature for more deterministic/structured output
    },
  });

  const outputText = response.response.text();

  // Clean up potential markdown formatting if Gemini disobeys rule 1
  const cleanedText = outputText
    .replace(/```json/i, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsedJson = JSON.parse(cleanedText);
    return parsedJson as PortfolioSections;
  } catch (error) {
    console.error("Failed to parse AI output as JSON:", cleanedText);
    throw new Error("AI generated invalid JSON");
  }
}
