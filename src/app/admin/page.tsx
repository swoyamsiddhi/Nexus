import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminOverviewClient from "./AdminOverviewClient";

export default async function AdminOverviewPage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/auth/signin");

    const [
        totalUsers, pendingVerifications, totalEvents, totalClubs, recentUsers
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { verificationStatus: "PENDING", role: { in: ["FACULTY", "ORGANIZER"] } } }),
        prisma.event.count(),
        prisma.club.count(),
        prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, name: true, email: true, role: true, verificationStatus: true, createdAt: true },
        }),
    ]);

    return (
        <AdminOverviewClient
            stats={{ totalUsers, pendingVerifications, totalEvents, totalClubs }}
            recentUsers={recentUsers}
        />
    );
}
