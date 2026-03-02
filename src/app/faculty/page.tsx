import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import FacultyHomeClient from "./FacultyHomeClient";

export default async function FacultyHomePage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "FACULTY") redirect("/auth/signin");

    const [profile, opportunities] = await Promise.all([
        prisma.facultyProfile.findUnique({
            where: { userId: session.user.id },
            include: {
                user: { select: { name: true, image: true } },
                lab: true,
            },
        }),
        prisma.researchOpportunity.findMany({
            where: { facultyId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { _count: { select: { applications: true } } },
        }),
    ]);

    return <FacultyHomeClient profile={profile} opportunities={opportunities} userName={session.user.name || "Faculty"} />;
}
