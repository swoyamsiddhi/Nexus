import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrganizerEventsClient from "./OrganizerEventsClient";

export default async function OrganizerEventsPage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ORGANIZER") {
        redirect("/auth/signin");
    }

    // Find the club this organizer manages
    const membership = await prisma.clubMembership.findFirst({
        where: { userId: session.user.id, role: { in: ["PRESIDENT", "OFFICER", "LEAD", "CORE"] } }
    });

    if (!membership?.clubId) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Club not found or pending approval.</p>
            </div>
        );
    }

    const events = await prisma.event.findMany({
        where: { clubId: membership.clubId },
        orderBy: { startTime: "desc" },
        include: { _count: { select: { registrations: true } } }
    });

    return <OrganizerEventsClient events={events} clubId={membership.clubId} />;
}
