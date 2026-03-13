import { GoogleGenerativeAI } from "@google/generative-ai";
import { PortfolioSections } from "../types/portfolio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function normalizePortfolioData(parsedJson: any): PortfolioSections {
  const normalized: PortfolioSections = {
    name: typeof parsedJson?.name === "string" ? parsedJson.name : undefined,
    summary: typeof parsedJson?.summary === "string" ? parsedJson.summary : "",
    experience: Array.isArray(parsedJson?.experience) ? parsedJson.experience : [],
    education: Array.isArray(parsedJson?.education) ? parsedJson.education : [],
    skills: Array.isArray(parsedJson?.skills) ? parsedJson.skills : [],
    projects: Array.isArray(parsedJson?.projects) ? parsedJson.projects : [],
    contact: typeof parsedJson?.contact === "object" && parsedJson?.contact
      ? parsedJson.contact
      : {},
  };

  const ats = parsedJson?.ats;
  if (ats && typeof ats === "object") {
    const rawSuggestions = Array.isArray(ats.suggestions) ? ats.suggestions : [];

    normalized.ats = {
      score: Math.max(0, Math.min(100, Number(ats.score) || 0)),
      summary: typeof ats.summary === "string" ? ats.summary : undefined,
      suggestions: rawSuggestions
        .map((item: any) => ({
          title: typeof item?.title === "string" ? item.title : "Improvement area",
          detail: typeof item?.detail === "string" ? item.detail : "Add more specific content for better ATS compatibility.",
          priority: item?.priority === "high" || item?.priority === "medium" || item?.priority === "low"
            ? item.priority
            : "medium",
        }))
        .slice(0, 6),
    };
  }

  return normalized;
}

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
5. Include ATS analysis with score and up to 6 concise suggestions.

Expected JSON Structure:
{
  "name": "Full Name from the resume",
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
  },
  "ats": {
    "score": 78,
    "summary": "One short sentence about ATS readiness.",
    "suggestions": [
      {
        "title": "Use more role-specific keywords",
        "detail": "Add keywords from your target role in summary, experience, and skills.",
        "priority": "high"
      }
    ]
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
    return normalizePortfolioData(parsedJson);
  } catch (error) {
    console.error("Failed to parse AI output as JSON:", cleanedText);
    throw new Error("AI generated invalid JSON");
  }
}
