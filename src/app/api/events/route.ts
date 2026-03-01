import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const createEventSchema = z.object({
    title: z.string().min(2).max(200),
    description: z.string().max(5000).optional(),
    location: z.string().max(300).optional(),
    isOnline: z.boolean().optional(),
    meetingLink: z.string().url().optional().or(z.literal("")),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
    maxCapacity: z.number().int().positive().optional(),
    clubId: z.string().cuid(),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") ?? "10"), 50);
    const clubId = searchParams.get("clubId");
    const upcoming = searchParams.get("upcoming") === "true";

    const where = {
        status: "PUBLISHED" as const,
        ...(clubId && { clubId }),
        ...(upcoming && { startDate: { gte: new Date() } }),
    };

    const [events, total] = await Promise.all([
        prisma.event.findMany({
            where,
            orderBy: { startDate: "asc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                coverImage: true,
                location: true,
                isOnline: true,
                startDate: true,
                endDate: true,
                maxCapacity: true,
                status: true,
                club: {
                    select: { id: true, name: true, slug: true, logoUrl: true },
                },
                _count: { select: { rsvps: true } },
            },
        }),
        prisma.event.count({ where }),
    ]);

    return NextResponse.json({
        data: events,
        total,
        page,
        pageSize,
        hasNextPage: page * pageSize < total,
        hasPrevPage: page > 1,
    });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createEventSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    // Verify user is an officer+ in the club
    const membership = await prisma.membership.findUnique({
        where: {
            userId_clubId: {
                userId: session.user.id,
                clubId: parsed.data.clubId,
            },
        },
    });

    const canCreate =
        membership?.status === "ACTIVE" &&
        ["OFFICER", "PRESIDENT", "FACULTY_ADVISOR"].includes(membership.role);

    if (!canCreate && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const { startDate, endDate, ...rest } = parsed.data;
    const slug = `${slugify(parsed.data.title)}-${Date.now()}`;

    const event = await prisma.event.create({
        data: {
            ...rest,
            slug,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : undefined,
            status: "PUBLISHED",
        },
        include: {
            club: { select: { id: true, name: true, slug: true, logoUrl: true } },
            _count: { select: { rsvps: true } },
        },
    });

    return NextResponse.json(event, { status: 201 });
}
