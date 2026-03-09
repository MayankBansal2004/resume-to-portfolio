import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { THEMES } from "@/themes";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ portfolioId: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { portfolioId } = await params;
        const body = await req.json();
        const { themeId } = body;

        if (!themeId || !THEMES.find(t => t.id === themeId)) {
            return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
        }

        await prisma.portfolio.update({
            where: { id: portfolioId, userId: session.user.id },
            data: { theme: themeId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[theme-update] Error:", error);
        return NextResponse.json({ error: "Failed to update theme" }, { status: 500 });
    }
}
