import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { parseResume } from "@/lib/gemini";
import slugify from "slugify";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { resumeId } = body;

        if (!resumeId) {
            return NextResponse.json({ error: "resumeId is required" }, { status: 400 });
        }

        // Fetch resume
        const resume = await prisma.resume.findUnique({
            where: { id: resumeId, userId: session.user.id },
        });

        if (!resume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        // Ensure we haven't already generated one (1 resume = 1 portfolio for MVP)
        const existingPortfolio = await prisma.portfolio.findUnique({
            where: { resumeId: resume.id },
        });

        if (existingPortfolio) {
            return NextResponse.json({
                portfolioId: existingPortfolio.id,
                slug: existingPortfolio.slug
            });
        }

        // Call Gemini AI
        const parsedData = await parseResume(resume.rawText);

        // Save structured logic to DB
        await prisma.resume.update({
            where: { id: resume.id },
            data: { parsedData: parsedData as any },
        });

        // Determine names
        const name = parsedData.name || session.user.name || "My Portfolio";
        const slugBase = slugify(name, { lower: true, strict: true }) || "portfolio";

        // Find best headline
        let headline = "Professional";
        if (parsedData.experience?.length > 0) {
            headline = parsedData.experience[0].title;
        } else if (parsedData.education?.length > 0) {
            headline = `${parsedData.education[0].degree} Graduate`;
        }

        // Create Portfolio
        const newPortfolio = await prisma.portfolio.create({
            data: {
                userId: session.user.id,
                resumeId: resume.id,
                slug: slugBase,       // Route will be /portfolio/[slug]/[portfolioId]
                title: name,
                headline,
                sections: parsedData as any,
                isPublished: true,    // Auto publish for MVP mapping
            },
        });

        return NextResponse.json({
            success: true,
            portfolioId: newPortfolio.id,
            slug: newPortfolio.slug
        });
    } catch (error) {
        console.error("[generate-portfolio] Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate portfolio" },
            { status: 500 }
        );
    }
}
