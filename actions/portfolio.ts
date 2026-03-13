"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getUserPortfolios() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    return prisma.portfolio.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });
}

export async function togglePublishPortfolio(portfolioId: string, isPublished: boolean) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.portfolio.update({
        where: { id: portfolioId, userId: session.user.id },
        data: { isPublished },
    });

    revalidatePath("/");
    return { success: true };
}

export async function deletePortfolio(portfolioId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    // Because of "onDelete: Cascade", deleting the resume deletes the portfolio too.
    // Wait, the relation is from Portfolio -> Resume. If we delete Portfolio, Resume is NOT deleted.
    // Let's delete the Portfolio and its associated Resume directly.

    const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId, userId: session.user.id },
        select: { resumeId: true }
    });

    if (!portfolio) throw new Error("Not found");

    if (portfolio.resumeId) {
        await prisma.resume.delete({
            where: { id: portfolio.resumeId, userId: session.user.id }
        });
    } else {
        await prisma.portfolio.delete({
            where: { id: portfolioId, userId: session.user.id }
        });
    }

    revalidatePath("/");
    return { success: true };
}

export async function generatePublicLink(portfolioId: string) {
    const session = await auth();
    const userId = session?.user?.id || null;

    const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId }
    });

    if (!portfolio) throw new Error("Not found");

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

    if (!isOwner) throw new Error("Unauthorized");

    // Generate a simple 8-character unique alphanumeric ID
    const publicId = Math.random().toString(36).substring(2, 10);

    const updated = await prisma.portfolio.update({
        where: { id: portfolioId },
        data: { publicId },
    });

    revalidatePath("/", "layout");
    return { publicId: updated.publicId };
}

export async function removePublicLink(portfolioId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.portfolio.update({
        where: { id: portfolioId, userId: session.user.id },
        data: { publicId: null },
    });

    revalidatePath("/", "layout");
    return { success: true };
}
