import { GoogleGenerativeAI } from "@google/generative-ai";
import type { PortfolioSections } from "@/types/portfolio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface RecruiterQAItem {
    question: string;
    answer: string;
}

export interface RecruiterChatMessage {
    role: "user" | "assistant";
    content: string;
}

function buildRecruiterContext(sections: PortfolioSections, rawText: string) {
    const safeText = (rawText || "").slice(0, 9000);
    const safeSections = {
        name: sections.name,
        summary: sections.summary,
        skills: sections.skills,
        experience: sections.experience,
        projects: sections.projects,
        education: sections.education,
    };

    return `Candidate profile data:\n${JSON.stringify(safeSections, null, 2)}\n\nRaw resume text:\n${safeText}`;
}

export async function generateRecruiterStarterQA(sections: PortfolioSections, rawText: string): Promise<RecruiterQAItem[]> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a recruiter interview copilot.
Generate EXACTLY 3 interview question-answer pairs based on the candidate's resume.

Rules:
1. Questions must be recruiter-friendly and practical.
2. Cover mixed topics: skills, projects, experience impact, problem-solving, and behavioral fit.
3. Answers should sound like ideal concise candidate responses based on resume evidence.
4. Return ONLY valid JSON, no markdown.

Expected JSON:
{
  "items": [
    {
      "question": "...",
      "answer": "..."
    }
  ]
}

${buildRecruiterContext(sections, rawText)}`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.4,
        },
    });

    const text = result.response
        .text()
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    const parsed = JSON.parse(text) as { items?: RecruiterQAItem[] };
    const items = Array.isArray(parsed?.items) ? parsed.items : [];

    return items
        .filter((item) => item && typeof item.question === "string" && typeof item.answer === "string")
        .slice(0, 3);
}

export async function generateRecruiterChatReply(
    sections: PortfolioSections,
    rawText: string,
    question: string,
    history: RecruiterChatMessage[]
) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const limitedHistory = history.slice(-12);
    const historyText = limitedHistory
        .map((msg) => `${msg.role === "user" ? "Recruiter" : "AI"}: ${msg.content}`)
        .join("\n");

    const prompt = `You are an AI recruiter assistant for a portfolio page.
The recruiter asks questions about this candidate resume. Answer in a concise, practical way.

Guidelines:
- Be specific to resume facts when possible.
- If the recruiter asks for more questions, provide exactly 3 high-quality follow-up questions.
- If data is missing, clearly say it's not in the resume.
- Keep response under 180 words.

${buildRecruiterContext(sections, rawText)}

Recent chat history:
${historyText || "(none)"}

Recruiter message:
${question}`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.5,
        },
    });

    return result.response.text().trim();
}
