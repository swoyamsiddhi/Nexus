import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default async function OrganizerLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");
    if (session.user.onboardingStatus === "PENDING") redirect("/onboarding");

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-background pointer-events-none" />
            <AppSidebar />
            <main className="flex-1 overflow-y-auto z-10">
                {children}
            </main>
        </div>
    );
}
