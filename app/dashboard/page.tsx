import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { PortfolioEmptyState } from "@/components/dashboard/PortfolioEmptyState";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { getUserPortfolios } from "@/actions/portfolio";
import { PortfolioCard } from "@/components/dashboard/PortfolioCard";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const { user } = session;
    const portfolios = await getUserPortfolios();

    return (
        <>
            <DashboardHeader
                title="Overview"
                subtitle={`Welcome back, ${user.name?.split(" ")[0] ?? "there"} 👋`}
                userName={user.name}
                userImage={user.image}
            />

            {/* Scrollable body */}
            <main className="flex-1 overflow-y-auto px-7 py-6">
                <div className="mx-auto max-w-6xl space-y-6">
                    {/* Stats */}
                    <StatsCards />

                    {/* Two-column layout: portfolios + quick actions */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Portfolios — takes 2/3 */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4">Your Portfolios</h2>

                            {portfolios.length === 0 ? (
                                <PortfolioEmptyState />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {portfolios.map((p) => (
                                        <PortfolioCard key={p.id} portfolio={p} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quick actions — takes 1/3 */}
                        <div>
                            <QuickActions />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
