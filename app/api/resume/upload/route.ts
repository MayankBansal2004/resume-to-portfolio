import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { saveFile } from "@/lib/storage";
import { extractTextFromBuffer } from "@/lib/resume-parser";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id || null;

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validate size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // 1. Save file locally
        const filePath = await saveFile(buffer, file.name);

        // 2. Extract text
        const rawText = await extractTextFromBuffer(buffer, file.name);

        // 3. Save to database
        const resume = await prisma.resume.create({
            data: {
                userId,
                filename: file.name,
                filePath,
                rawText,
            },
        });

        return NextResponse.json({
            success: true,
            resumeId: resume.id,
            filename: file.name
        });
    } catch (error) {
        console.error("[upload-resume] Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to process resume" },
            { status: 500 }
        );
    }
}
