import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");
    if (session.user.onboardingStatus === "PENDING") redirect("/onboarding");

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
