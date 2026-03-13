import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { PortfolioSections } from "@/types/portfolio";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import { buildAtsInsights } from "@/lib/ats";

interface PageProps {
    params: Promise<{ slug: string; portfolioId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { portfolioId } = await params;
    const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } });
    if (!portfolio) return {};
    return {
        title: `${portfolio.title} — Portfolio`,
        description: portfolio.headline || `${portfolio.title}'s professional portfolio`,
    };
}

export default async function PortfolioPage({ params, searchParams }: PageProps) {
    const { slug, portfolioId } = await params;
    const resolvedSearchParams = await searchParams;

    const [portfolio, session] = await Promise.all([
        prisma.portfolio.findUnique({
            where: { id: portfolioId },
            include: {
                user: true,
                resume: {
                    select: {
                        filePath: true,
                        filename: true,
                        rawText: true,
                    }
                }
            },
        }),
        auth(),
    ]);

    if (!portfolio || portfolio.slug !== slug) notFound();

    const isOwner = session?.user?.id === portfolio.userId;

    // Redirect non-owners if the portfolio is not published
    if (!portfolio.isPublished && !isOwner) redirect("/");

    const sections = portfolio.sections as unknown as PortfolioSections;
    const atsInsights = sections.ats ?? buildAtsInsights(portfolio.resume.rawText, sections);
    const themeToUse = (typeof resolvedSearchParams?.theme === 'string')
        ? resolvedSearchParams.theme
        : portfolio.theme;

    return (
        <PortfolioRenderer
            themeId={themeToUse}
            portfolioId={portfolioId}
            publicId={portfolio.publicId ?? null}
            title={sections.name || portfolio.title}
            headline={portfolio.headline}
            avatar={portfolio.user?.image ?? null}
            sections={sections}
            isOwner={isOwner}
            showAtsInsights={isOwner}
            atsInsights={isOwner ? atsInsights : null}
            resumeDocument={isOwner ? {
                fileUrl: portfolio.resume.filePath,
                filename: portfolio.resume.filename,
            } : null}
        />
    );
}
