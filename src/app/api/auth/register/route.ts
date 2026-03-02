import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isCollegeDomain } from "@/lib/utils";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["STUDENT", "FACULTY", "ORGANIZER"]),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
        }

        const { name, email, password, role } = parsed.data;

        // College domain check (bypassed in dev)
        if (!isCollegeDomain(email)) {
            return NextResponse.json(
                { error: "Please use your college email address to sign up." },
                { status: 400 }
            );
        }

        // Check for existing user
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user — faculty and organizer need admin verification
        const verificationStatus = role === "STUDENT" ? "APPROVED" : "PENDING";

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                verificationStatus,
                onboardingStatus: "PENDING",
            },
        });

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
