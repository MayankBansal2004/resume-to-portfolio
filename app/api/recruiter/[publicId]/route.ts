import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PortfolioSections } from "@/types/portfolio";
import { generateRecruiterChatReply, generateRecruiterStarterQA, type RecruiterChatMessage } from "@/lib/recruiter";

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ publicId: string }> }
) {
    try {
        const { publicId } = await context.params;
        const body = await req.json();
        const mode = body?.mode;

        if (mode !== "bootstrap" && mode !== "chat") {
            return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
        }

        const portfolio = await prisma.portfolio.findUnique({
            where: { publicId },
            include: {
                resume: {
                    select: {
                        rawText: true,
                    },
                },
            },
        });

        if (!portfolio || !portfolio.isPublished) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        const sections = portfolio.sections as unknown as PortfolioSections;
        const rawText = portfolio.resume.rawText || "";

        if (mode === "bootstrap") {
            const items = await generateRecruiterStarterQA(sections, rawText);
            return NextResponse.json({ items });
        }

        const question = typeof body?.question === "string" ? body.question.trim() : "";
        const history = Array.isArray(body?.history) ? body.history : [];

        if (!question) {
            return NextResponse.json({ error: "Question is required" }, { status: 400 });
        }

        const normalizedHistory: RecruiterChatMessage[] = history
            .map((item: any) => ({
                role: item?.role === "assistant" ? "assistant" : "user",
                content: typeof item?.content === "string" ? item.content : "",
            }))
            .filter((item: RecruiterChatMessage) => item.content.length > 0);

        const answer = await generateRecruiterChatReply(sections, rawText, question, normalizedHistory);

        return NextResponse.json({ answer });
    } catch (error) {
        console.error("[recruiter-chat] Error:", error);
        return NextResponse.json({ error: "Failed to process recruiter request" }, { status: 500 });
    }
}
