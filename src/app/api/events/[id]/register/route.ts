import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const userId = session.user.id;
    const eventId = resolvedParams.id;

    // Check if event exists
    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { registrations: true } } }
    });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // Custom capacity check logic
    if (event.capacity && event._count.registrations >= event.capacity) {
        return NextResponse.json({ error: "Event is at full capacity" }, { status: 400 });
    }

    // Check if already registered
    const existing = await prisma.eventRegistration.findUnique({
        where: { eventId_userId: { userId, eventId } }
    });

    if (existing) {
        return NextResponse.json({ error: "Already registered" }, { status: 400 });
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
        data: {
            userId,
            eventId,
            status: event.requiresApproval ? "WAITLISTED" : "REGISTERED"
        }
    });

    return NextResponse.json(registration, { status: 201 });
}
