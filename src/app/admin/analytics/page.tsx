import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarChart3, TrendingUp, Users } from "lucide-react";

export default async function AdminAnalyticsPage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/auth/signin");

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold">Platform Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">Campus adoption and engagement metrics</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="nexus-card p-6 h-64 flex flex-col items-center justify-center text-muted-foreground">
                    <Users className="w-8 h-8 opacity-20 mb-3" />
                    <p className="text-sm font-medium">User Growth Chart</p>
                </div>
                <div className="nexus-card p-6 h-64 flex flex-col items-center justify-center text-muted-foreground">
                    <TrendingUp className="w-8 h-8 opacity-20 mb-3" />
                    <p className="text-sm font-medium">Event Engagement</p>
                </div>
                <div className="nexus-card p-6 h-64 flex flex-col items-center justify-center text-muted-foreground">
                    <BarChart3 className="w-8 h-8 opacity-20 mb-3" />
                    <p className="text-sm font-medium">Research Match Rate</p>
                </div>
            </div>
        </div>
    );
}
