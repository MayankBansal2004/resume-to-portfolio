import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { THEMES } from "@/themes";
import { cookies } from "next/headers";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ portfolioId: string }> }
) {
    try {
        const session = await auth();
        const userId = session?.user?.id || null;

        const { portfolioId } = await params;
        const body = await req.json();
        const { themeId } = body;

        if (!themeId || !THEMES.find(t => t.id === themeId)) {
            return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
        }

        const portfolio = await prisma.portfolio.findUnique({
            where: { id: portfolioId },
        });

        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        let isOwner = false;
        if (portfolio.userId && portfolio.userId === userId) {
            isOwner = true;
        } else if (!portfolio.userId) {
            const cookieStore = await cookies();
            try {
                const guestPortfolios = JSON.parse(cookieStore.get("guest_portfolios")?.value || "[]");
                if (guestPortfolios.includes(portfolio.id)) {
                    isOwner = true;
                }
            } catch (e) {
                // ignore
            }
        }

        if (!isOwner) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.portfolio.update({
            where: { id: portfolioId },
            data: { theme: themeId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[theme-update] Error:", error);
        return NextResponse.json({ error: "Failed to update theme" }, { status: 500 });
    }
}
