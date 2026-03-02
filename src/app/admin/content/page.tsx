import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CopyX, Eye, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminContentPage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/auth/signin");

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold">Content Moderation</h1>
                <p className="text-sm text-muted-foreground mt-1">Review flagged events, clubs, and research posts</p>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border rounded-2xl bg-card">
                <ShieldAlert className="w-12 h-12 mb-4 opacity-20" />
                <h2 className="text-lg font-semibold text-foreground mb-1">No Active Reports</h2>
                <p className="text-sm">The platform is currently clean. All reported content will appear here.</p>
                <Button variant="outline" className="mt-6 gap-2">
                    <Eye className="w-4 h-4" /> View Auto-Moderation Logs
                </Button>
            </div>
        </div>
    );
}
