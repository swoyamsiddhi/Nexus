import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteCache, CACHE_KEYS } from "@/lib/redis";

// GET /api/notifications — fetch current user's notifications
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unread") === "true";
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = 20;

    const where = {
        recipientId: session.user.id,
        ...(unreadOnly && { isRead: false }),
    };

    const [notifications, total, unreadCount] = await Promise.all([
        prisma.notification.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                sender: { select: { id: true, name: true, image: true } },
                club: { select: { id: true, name: true, logoUrl: true } },
            },
        }),
        prisma.notification.count({ where }),
        prisma.notification.count({
            where: { recipientId: session.user.id, isRead: false },
        }),
    ]);

    return NextResponse.json({ data: notifications, total, unreadCount, page, pageSize });
}

// PATCH /api/notifications — mark notifications as read
export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { ids, markAll } = body as { ids?: string[]; markAll?: boolean };

    if (markAll) {
        await prisma.notification.updateMany({
            where: { recipientId: session.user.id, isRead: false },
            data: { isRead: true },
        });
    } else if (ids && ids.length > 0) {
        await prisma.notification.updateMany({
            where: {
                id: { in: ids },
                recipientId: session.user.id,
            },
            data: { isRead: true },
        });
    }

    // Bust cache
    await deleteCache(CACHE_KEYS.notifications(session.user.id));

    return NextResponse.json({ success: true });
}
