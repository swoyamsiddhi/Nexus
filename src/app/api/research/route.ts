import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ResearchType, CompensationType, LocationType } from "@prisma/client";

const createSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    type: z.nativeEnum(ResearchType),
    duration: z.string().optional(),
    timeCommitmentHours: z.number().optional(),
    compensationType: z.nativeEnum(CompensationType),
    locationType: z.nativeEnum(LocationType),
    skillsRequired: z.array(z.string()).optional(),
    branchPreference: z.array(z.string()).optional(),
    yearPreference: z.array(z.string()).optional(),
    minCgpa: z.number().optional(),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "OPEN";

    const opportunities = await prisma.researchOpportunity.findMany({
        where: { status },
        orderBy: { createdAt: "desc" },
        include: {
            faculty: {
                include: { user: { select: { name: true, image: true } } },
            },
            _count: { select: { applications: true } },
        },
    });

    return NextResponse.json(opportunities);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "FACULTY") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const facultyProfile = await prisma.facultyProfile.findUnique({ where: { userId: session.user.id } });
    if (!facultyProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

    const { skillsRequired, branchPreference, yearPreference, ...rest } = parsed.data;

    const opportunity = await prisma.researchOpportunity.create({
        data: {
            ...rest,
            facultyId: facultyProfile.id,
            status: "OPEN",
            skillsRequired: JSON.stringify(skillsRequired || []),
            branchPreference: JSON.stringify(branchPreference || []),
            yearPreference: JSON.stringify(yearPreference || []),
        },
    });

    return NextResponse.json(opportunity, { status: 201 });
}
