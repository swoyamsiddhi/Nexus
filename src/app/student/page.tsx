import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { parseJsonArray, formatEventDate, computeMatchScore } from "@/lib/utils";
import StudentHomeClient from "./StudentHomeClient";

async function getStudentHomeData(userId: string) {
    const [profile, upcomingEvents, recentConnections, researchOpportunities, clubs] = await Promise.all([
        prisma.studentProfile.findUnique({
            where: { userId },
            include: { user: { select: { name: true, image: true } } },
        }),
        prisma.event.findMany({
            where: { status: "PUBLISHED", startTime: { gte: new Date() } },
            orderBy: { startTime: "asc" },
            take: 5,
            include: { club: { select: { name: true, logo: true } }, _count: { select: { registrations: true } } },
        }),
        prisma.user.findMany({
            where: { role: "STUDENT", id: { not: userId } },
            take: 4,
            include: { studentProfile: { select: { branch: true, year: true, skills: true, availabilityStatus: true } } },
            orderBy: { createdAt: "desc" },
        }),
        prisma.researchOpportunity.findMany({
            where: { status: "OPEN" },
            take: 3,
            include: { faculty: { include: { user: { select: { name: true, image: true } } } } },
        }),
        prisma.club.findMany({
            where: { isActive: true },
            take: 6,
            include: { _count: { select: { members: true } } },
        }),
    ]);

    const userSkills = parseJsonArray(profile?.skills);

    const opportunitiesWithScore = researchOpportunities.map((opp) => ({
        ...opp,
        matchScore: computeMatchScore(parseJsonArray(opp.skillsRequired), userSkills),
    }));

    return { profile, upcomingEvents, recentConnections, opportunities: opportunitiesWithScore, clubs };
}

export default async function StudentHomePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const data = await getStudentHomeData(session.user.id);
    return <StudentHomeClient {...data} userName={session.user.name || "Student"} />;
}
