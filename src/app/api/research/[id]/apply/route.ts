import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applySchema = z.object({
    coverLetter: z.string().optional(),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "STUDENT") {
        return NextResponse.json({ error: "Unauthorized. Only students can apply." }, { status: 401 });
    }

    const resolvedParams = await params;
    const userId = session.user.id;
    const opportunityId = resolvedParams.id;

    const opportunity = await prisma.researchOpportunity.findUnique({ where: { id: opportunityId } });
    if (!opportunity || opportunity.status !== "OPEN") {
        return NextResponse.json({ error: "Opportunity not available" }, { status: 404 });
    }

    const existing = await prisma.application.findUnique({
        where: { opportunityId_studentId: { studentId: userId, opportunityId } }
    });

    if (existing) return NextResponse.json({ error: "Already applied" }, { status: 400 });

    const body = await req.json();
    const parsed = applySchema.safeParse(body);

    const application = await prisma.application.create({
        data: {
            studentId: userId,
            opportunityId,
            status: "SUBMITTED",
            coverLetter: parsed.success ? parsed.data.coverLetter : null,
        }
    });

    return NextResponse.json(application, { status: 201 });
}
