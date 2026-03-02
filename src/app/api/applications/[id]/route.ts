import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { status } = await req.json();
    if (!["SUBMITTED", "ACCEPTED", "REJECTED", "SHORTLISTED", "WITHDRAWN"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const resolvedParams = await params;
    // Allow the applicant themselves or a faculty member to update
    const application = await prisma.application.findUnique({
        where: { id: resolvedParams.id },
        include: {
            opportunity: { include: { faculty: true } }
        }
    });

    if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isFaculty = session.user.role === "FACULTY" && application.opportunity.faculty.userId === session.user.id;
    const isApplicant = application.studentId === session.user.id && status === "WITHDRAWN";

    if (!isFaculty && !isApplicant && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.application.update({
        where: { id: resolvedParams.id },
        data: { status }
    });

    return NextResponse.json(updated);
}
