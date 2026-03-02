import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrganizerHomeClient from "./OrganizerHomeClient";

export default async function OrganizerHomePage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ORGANIZER") {
        redirect("/auth/signin");
    }

    // Find the club this organizer manages
    const membership = await prisma.clubMembership.findFirst({
        where: { userId: session.user.id, role: { in: ["PRESIDENT", "OFFICER", "LEAD", "CORE"] } },
        include: {
            club: {
                include: {
                    _count: { select: { events: true, members: true } },
                    events: {
                        where: { startTime: { gte: new Date() } },
                        orderBy: { startTime: "asc" },
                        take: 3,
                        include: { _count: { select: { registrations: true } } }
                    }
                }
            }
        }
    });

    const club = membership?.club;

    return <OrganizerHomeClient club={club} userName={session.user.name || "Organizer"} />;
}
