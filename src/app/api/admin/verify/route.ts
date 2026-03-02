import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, action } = await req.json();
    if (!userId || !["approve", "reject"].includes(action)) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const verificationStatus = action === "approve" ? "APPROVED" : "REJECTED";

    const user = await prisma.user.update({
        where: { id: userId },
        data: { verificationStatus },
        select: { id: true, name: true, email: true, role: true, verificationStatus: true },
    });

    return NextResponse.json(user);
}
