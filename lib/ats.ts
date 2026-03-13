import type { AtsInsights, AtsSuggestion, PortfolioSections } from "@/types/portfolio";

function hasNumbers(text: string) {
    return /(\d+%|\d+\+|\$\d+|\b\d{2,}\b)/.test(text);
}

export function buildAtsInsights(rawText: string, sections: PortfolioSections): AtsInsights {
    const suggestions: AtsSuggestion[] = [];

    const summaryWords = sections.summary?.trim().split(/\s+/).filter(Boolean).length ?? 0;
    const experienceCount = sections.experience?.length ?? 0;
    const projectsCount = sections.projects?.length ?? 0;
    const skillsCount = sections.skills?.length ?? 0;

    const hasMetrics = sections.experience?.some((exp) =>
        (exp.description ?? []).some((line) => hasNumbers(line))
    );

    const contact = sections.contact ?? {};
    const hasLinkedIn = Boolean(contact.linkedin);
    const hasGitHub = Boolean(contact.github);
    const hasWebsite = Boolean(contact.website);

    let score = 55;

    if (summaryWords >= 45) score += 8;
    else if (summaryWords < 25) {
        score -= 6;
        suggestions.push({
            title: "Strengthen your summary",
            detail: "Write a 2-3 line summary with role focus, years of experience, and your strongest technical keywords.",
            priority: "high",
        });
    }

    if (experienceCount >= 2) score += 10;
    else {
        score -= 8;
        suggestions.push({
            title: "Add more experience depth",
            detail: "Include at least 2 role entries with responsibilities and outcomes to improve ATS relevance.",
            priority: "high",
        });
    }

    if (skillsCount >= 8) score += 8;
    else {
        score -= 5;
        suggestions.push({
            title: "Expand your skills section",
            detail: "Add role-specific skills (frameworks, tools, cloud, testing, CI/CD) to match recruiter filters.",
            priority: "medium",
        });
    }

    if (projectsCount >= 2) score += 7;
    else {
        score -= 4;
        suggestions.push({
            title: "Showcase more projects",
            detail: "Add 2+ projects with impact, stack, and links so ATS systems can detect practical experience.",
            priority: "medium",
        });
    }

    if (hasMetrics) score += 7;
    else {
        score -= 6;
        suggestions.push({
            title: "Use measurable achievements",
            detail: "Add numbers like percentages, cost savings, latency reduction, or growth metrics in experience bullets.",
            priority: "high",
        });
    }

    if (hasLinkedIn || hasGitHub || hasWebsite) score += 3;
    else {
        suggestions.push({
            title: "Add professional profile links",
            detail: "Include LinkedIn and optionally GitHub/portfolio website so recruiters can verify your profile faster.",
            priority: "low",
        });
    }

    if (rawText.length < 1200) {
        suggestions.push({
            title: "Increase keyword coverage",
            detail: "Your resume text looks brief. Add domain keywords from target job descriptions to improve ATS matching.",
            priority: "medium",
        });
        score -= 3;
    }

    if (sections.education?.length === 0) {
        suggestions.push({
            title: "Include education details",
            detail: "Add degree, institution, and dates so screening systems can classify your background correctly.",
            priority: "low",
        });
        score -= 2;
    }

    score = Math.min(95, Math.max(40, score));

    const finalSuggestions = suggestions.slice(0, 6);

    return {
        score,
        summary: score >= 80
            ? "Strong ATS readiness. Small refinements can increase interview conversion."
            : score >= 65
                ? "Good foundation. Improve keyword relevance and measurable impact for better ATS ranking."
                : "Moderate ATS readiness. Prioritize high-impact edits below to improve discoverability.",
        suggestions: finalSuggestions,
    };
}
