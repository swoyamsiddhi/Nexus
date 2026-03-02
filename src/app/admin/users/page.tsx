import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/auth/signin");

    const resolvedParams = await searchParams;
    const filter = resolvedParams?.filter;
    const where = filter === "pending"
        ? { verificationStatus: "PENDING" as const, role: { in: ["FACULTY" as const, "ORGANIZER" as const] } }
        : {};

    const users = await prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
            id: true, name: true, email: true, role: true,
            verificationStatus: true, onboardingStatus: true, createdAt: true,
        },
    });

    return <AdminUsersClient users={users} activeFilter={filter || "all"} />;
}
