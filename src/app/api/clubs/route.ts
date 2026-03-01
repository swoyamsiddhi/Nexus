import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCache, setCache, CACHE_KEYS, CACHE_TTL } from "@/lib/redis";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const createClubSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(2000).optional(),
    shortBio: z.string().max(200).optional(),
    category: z.string().min(1),
    tags: z.array(z.string()).max(10).optional(),
    isPrivate: z.boolean().optional(),
    website: z.string().url().optional().or(z.literal("")),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    discord: z.string().optional(),
});

// GET /api/clubs — list clubs with search/filter/pagination
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") ?? "12"), 50);
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "";
    const sort = searchParams.get("sort") ?? "members";

    // Try cache (only for non-search requests)
    if (!search && !category) {
        const cached = await getCache(CACHE_KEYS.clubs(page));
        if (cached) return NextResponse.json(cached);
    }

    const where = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { description: { contains: search, mode: "insensitive" as const } },
                { tags: { has: search } },
            ],
        }),
        ...(category && { category }),
    };

    const orderBy =
        sort === "members"
            ? { memberships: { _count: "desc" as const } }
            : sort === "events"
                ? { events: { _count: "desc" as const } }
                : { createdAt: "desc" as const };

    const [clubs, total] = await Promise.all([
        prisma.club.findMany({
            where,
            orderBy,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                shortBio: true,
                logoUrl: true,
                bannerUrl: true,
                category: true,
                tags: true,
                isPrivate: true,
                isVerified: true,
                _count: { select: { memberships: true, events: true } },
            },
        }),
        prisma.club.count({ where }),
    ]);

    const response = {
        data: clubs,
        total,
        page,
        pageSize,
        hasNextPage: page * pageSize < total,
        hasPrevPage: page > 1,
    };

    // Cache for 5 minutes
    if (!search && !category) {
        await setCache(CACHE_KEYS.clubs(page), response, CACHE_TTL.MEDIUM);
    }

    return NextResponse.json(response);
}

// POST /api/clubs — create a new club
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createClubSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    const { name, ...rest } = parsed.data;
    const slug = slugify(name);

    // Check slug uniqueness
    const existing = await prisma.club.findUnique({ where: { slug } });
    if (existing) {
        return NextResponse.json({ error: "A club with this name already exists" }, { status: 409 });
    }

    const club = await prisma.club.create({
        data: {
            name,
            slug,
            founderId: session.user.id,
            ...rest,
            // Auto-add founder as president
            memberships: {
                create: {
                    userId: session.user.id,
                    role: "PRESIDENT",
                    status: "ACTIVE",
                },
            },
        },
        include: {
            founder: { select: { id: true, name: true, image: true } },
            _count: { select: { memberships: true, events: true, posts: true } },
        },
    });

    return NextResponse.json(club, { status: 201 });
}
