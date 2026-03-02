import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const where = type ? { type: type as any } : {};

    const events = await prisma.event.findMany({
        where,
        orderBy: { startTime: "asc" },
        include: {
            club: { select: { name: true, logo: true } },
            _count: { select: { registrations: true } },
        }
    });

    return NextResponse.json(events);
}
