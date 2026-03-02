import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { parseJsonArray, computeMatchScore } from "@/lib/utils";
import ResearchClient from "./ResearchClient";

export default async function ResearchPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: session.user.id },
    });

    const userSkills = parseJsonArray(studentProfile?.skills);
    const userBranch = studentProfile?.branch || "";
    const userYear = studentProfile?.year || 0;

    const opportunities = await prisma.researchOpportunity.findMany({
        where: { status: "OPEN" },
        orderBy: { createdAt: "desc" },
        include: {
            faculty: {
                include: { user: { select: { name: true, image: true } } },
            },
            lab: true,
            _count: { select: { applications: true } },
        },
    });

    const opportunitiesWithScore = opportunities.map((opp) => {
        const reqSkills = parseJsonArray(opp.skillsRequired);
        const yearPrefs = parseJsonArray(opp.yearPreference);
        const branchPrefs = parseJsonArray(opp.branchPreference);
        const yearMatch = yearPrefs.length === 0 || yearPrefs.includes(String(userYear));
        const branchMatch = branchPrefs.length === 0 || branchPrefs.some(b => b.toLowerCase() === userBranch.toLowerCase());
        const cgpaOk = !opp.minCgpa || (studentProfile?.cgpa || 0) >= opp.minCgpa;
        return {
            ...opp,
            matchScore: computeMatchScore(reqSkills, userSkills, { yearMatch, branchMatch, cgpaOk }),
        };
    });

    opportunitiesWithScore.sort((a, b) => b.matchScore - a.matchScore);

    return <ResearchClient opportunities={opportunitiesWithScore} />;
}
