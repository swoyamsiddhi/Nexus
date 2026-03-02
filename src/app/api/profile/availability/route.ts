import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
    availabilityStatus: z.enum(["OPEN", "BUSY", "LOOKING_FOR_TEAM"]),
});

export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "STUDENT") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.studentProfile.update({
        where: { userId: session.user.id },
        data: { availabilityStatus: parsed.data.availabilityStatus },
    });

    return NextResponse.json({ availabilityStatus: updated.availabilityStatus });
}
