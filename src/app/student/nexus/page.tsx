import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NexusClient from "./NexusClient";

export default async function NexusPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");
    const userId = session.user.id;

    // For the demo/mvp, we'll fetch connections and notifications
    const [connections, notifications] = await Promise.all([
        prisma.user.findMany({
            where: { role: "STUDENT", id: { not: userId } },
            take: 20,
            include: {
                studentProfile: { select: { branch: true, year: true, skills: true, availabilityStatus: true } }
            }
        }),
        prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 20,
        })
    ]);

    return <NexusClient initialConnections={connections} initialNotifications={notifications} currentUser={session.user} />;
}
