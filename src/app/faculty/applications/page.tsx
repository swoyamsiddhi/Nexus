import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import FacultyApplicationsClient from "./FacultyApplicationsClient";

export default async function FacultyApplicationsPage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "FACULTY") redirect("/auth/signin");

    const profile = await prisma.facultyProfile.findUnique({ where: { userId: session.user.id } });
    if (!profile) redirect("/onboarding");

    const opportunities = await prisma.researchOpportunity.findMany({
        where: { facultyId: profile.id },
        include: {
            applications: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            email: true,
                            studentProfile: {
                                select: { branch: true, year: true, skills: true, cgpa: true, availabilityStatus: true },
                            },
                        },
                    },
                },
            },
        },
    });

    return <FacultyApplicationsClient opportunities={opportunities} />;
}
