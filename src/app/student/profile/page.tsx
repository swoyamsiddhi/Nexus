import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function StudentProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const profile = await prisma.studentProfile.findUnique({
        where: { userId: session.user.id },
        include: {
            user: { select: { name: true, email: true, image: true, createdAt: true } },
        }
    });

    if (!profile) redirect("/onboarding");

    return <ProfileClient profile={profile} />;
}
