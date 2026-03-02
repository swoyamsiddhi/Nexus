import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EventDetailClient from "./EventDetailClient";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const resolvedParams = await params;

    const event = await prisma.event.findUnique({
        where: { id: resolvedParams.id },
        include: {
            club: { select: { id: true, name: true, logo: true, category: true } },
            _count: { select: { registrations: true } },
        }
    });

    if (!event) notFound();

    let registrationStatus = null;
    if (session?.user?.id) {
        const reg = await prisma.eventRegistration.findUnique({
            where: { eventId_userId: { userId: session.user.id, eventId: event.id } }
        });
        if (reg) registrationStatus = reg.status;
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {session?.user && <AppSidebar />}
            <main className="flex-1 overflow-y-auto">
                <EventDetailClient event={event} isRegistered={!!registrationStatus} regStatus={registrationStatus} session={session} />
            </main>
        </div>
    );
}
