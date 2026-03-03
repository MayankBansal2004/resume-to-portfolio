import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { PortfolioEmptyState } from "@/components/dashboard/PortfolioEmptyState";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    const { user } = session;

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
                        <div className="lg:col-span-2">
                            <PortfolioEmptyState />
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
