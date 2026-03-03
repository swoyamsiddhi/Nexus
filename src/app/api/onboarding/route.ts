import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const studentOnboardingSchema = z.object({
    rollNumber: z.string().optional(),
    branch: z.string().min(1),
    year: z.number().min(1).max(6),
    isHosteler: z.boolean().optional(),
    bio: z.string().optional(),
    skills: z.array(z.string()),
    interests: z.array(z.string()),
    availability: z.enum(["OPEN", "BUSY", "LOOKING_FOR_TEAM"]).optional().default("OPEN"),
});

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role, data } = body;
    const userId = session.user.id;

    try {
        if (role === "STUDENT") {
            const parsed = studentOnboardingSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Onboarding validation error:", parsed.error.issues);
                return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
            }
            const { rollNumber, branch, year, isHosteler, bio, skills, interests, availability } = parsed.data;

            await prisma.$transaction([
                prisma.studentProfile.upsert({
                    where: { userId },
                    create: {
                        userId,
                        rollNumber,
                        branch,
                        year,
                        isHosteler: isHosteler || false,
                        bio,
                        skills: JSON.stringify(skills),
                        interests: JSON.stringify(interests),
                        availabilityStatus: availability,
                    },
                    update: {
                        rollNumber,
                        branch,
                        year,
                        isHosteler: isHosteler || false,
                        bio,
                        skills: JSON.stringify(skills),
                        interests: JSON.stringify(interests),
                        availabilityStatus: availability,
                    },
                }),
                prisma.user.update({
                    where: { id: userId },
                    data: { onboardingStatus: "COMPLETE" },
                }),
            ]);
        } else if (role === "FACULTY") {
            const { branch: department, bio, skills: researchAreas } = data;
            await prisma.$transaction([
                prisma.facultyProfile.upsert({
                    where: { userId },
                    create: { userId, department, bio, researchAreas: JSON.stringify(researchAreas || []) },
                    update: { department, bio, researchAreas: JSON.stringify(researchAreas || []) },
                }),
                prisma.user.update({ where: { id: userId }, data: { onboardingStatus: "COMPLETE" } }),
            ]);
        } else if (role === "ORGANIZER") {
            const { bio } = data;
            await prisma.$transaction([
                prisma.organizerProfile.upsert({
                    where: { userId },
                    create: { userId, bio },
                    update: { bio },
                }),
                prisma.user.update({ where: { id: userId }, data: { onboardingStatus: "COMPLETE" } }),
            ]);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Onboarding error:", error);
        return NextResponse.json({ error: "Failed to save onboarding data" }, { status: 500 });
    }
}
