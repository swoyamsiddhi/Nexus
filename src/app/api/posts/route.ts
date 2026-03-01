import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPostSchema = z.object({
    content: z.string().min(1).max(10000),
    title: z.string().max(300).optional(),
    type: z.enum(["ANNOUNCEMENT", "DISCUSSION", "EVENT_UPDATE", "MEDIA"]).optional(),
    imageUrls: z.array(z.string().url()).max(10).optional(),
    clubId: z.string().cuid(),
    eventId: z.string().cuid().optional(),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") ?? "10"), 50);
    const clubId = searchParams.get("clubId");

    const where = clubId ? { clubId } : {};

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            where,
            orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                title: true,
                content: true,
                type: true,
                imageUrls: true,
                isPinned: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, name: true, image: true } },
                club: { select: { id: true, name: true, slug: true } },
                _count: { select: { comments: true, likes: true } },
            },
        }),
        prisma.post.count({ where }),
    ]);

    return NextResponse.json({
        data: posts,
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
    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    // Must be an active member of the club to post
    const membership = await prisma.membership.findUnique({
        where: {
            userId_clubId: {
                userId: session.user.id,
                clubId: parsed.data.clubId,
            },
        },
    });

    if ((!membership || membership.status !== "ACTIVE") && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Must be an active club member to post" }, { status: 403 });
    }

    const post = await prisma.post.create({
        data: {
            ...parsed.data,
            authorId: session.user.id,
        },
        include: {
            author: { select: { id: true, name: true, image: true } },
            club: { select: { id: true, name: true, slug: true } },
            _count: { select: { comments: true, likes: true } },
        },
    });

    return NextResponse.json(post, { status: 201 });
}
