import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { PortfolioSections } from "@/types/portfolio";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";

interface PageProps {
    params: Promise<{ publicId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { publicId } = await params;
    const portfolio = await prisma.portfolio.findUnique({ where: { publicId } });
    if (!portfolio || !portfolio.isPublished) return {};
    return {
        title: `${portfolio.title} — Portfolio`,
        description: portfolio.headline || `${portfolio.title}'s professional portfolio`,
    };
}

export default async function PublicPortfolioPage({ params, searchParams }: PageProps) {
    const { publicId } = await params;
    const resolvedSearchParams = await searchParams;

    // Use Prisma to find by publicId
    const [portfolio, session] = await Promise.all([
        prisma.portfolio.findUnique({
            where: { publicId },
            include: { user: true },
        }),
        auth(),
    ]);

    // If portfolio doesn't exist or isn't published, throw 404
    if (!portfolio || !portfolio.isPublished) notFound();

    const sections = portfolio.sections as unknown as PortfolioSections;

    // the owner can still view their public link and change their own theme
    const isOwner = session?.user?.id === portfolio.userId;

    const themeToUse = (typeof resolvedSearchParams?.theme === 'string')
        ? resolvedSearchParams.theme
        : portfolio.theme;

    return (
        <PortfolioRenderer
            themeId={themeToUse}
            portfolioId={portfolio.id}
            publicId={portfolio.publicId ?? null}
            title={sections.name || portfolio.title}
            headline={portfolio.headline}
            avatar={portfolio.user?.image ?? null}
            sections={sections}
            isOwner={isOwner}
        />
    );
}
