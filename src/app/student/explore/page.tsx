import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const [events, clubs] = await Promise.all([
        prisma.event.findMany({
            where: { status: "PUBLISHED" },
            orderBy: { startTime: "asc" },
            take: 20,
            include: {
                club: { select: { name: true, logo: true } },
                _count: { select: { registrations: true } },
            },
        }),
        prisma.club.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            take: 20,
            include: { _count: { select: { members: true, events: true } } },
        }),
    ]);

    return <ExploreClient events={events} clubs={clubs} />;
}
