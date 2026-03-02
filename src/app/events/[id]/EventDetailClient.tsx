"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar, MapPin, Clock, Users, Building2, Ticket, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatEventDate, generateAvatarColor, getInitials } from "@/lib/utils";

export default function EventDetailClient({ event, isRegistered, regStatus, session }: any) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(isRegistered);
    const [status, setStatus] = useState(regStatus);

    const handleRegister = async () => {
        if (!session) {
            router.push("/auth/signin");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/events/${event.id}/register`, { method: "POST" });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();

            setRegistered(true);
            setStatus(data.status);
            toast({ title: "Registration successful! 🎉", variant: "success" as any });
        } catch (err: any) {
            toast({ variant: "destructive", title: "Registration failed", description: err.message || "Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const isFull = event.capacity && event._count.registrations >= event.capacity;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20 relative">
            <button onClick={() => router.back()} className="text-sm font-medium text-muted-foreground flex items-center hover:text-foreground transition-colors mb-4">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>

            {/* Hero Header */}
            <div className="relative rounded-3xl overflow-hidden bg-card border shadow-sm flex flex-col md:flex-row">
                {event.posterImage ? (
                    <div className="md:w-2/5 h-64 md:h-auto shrink-0 relative">
                        <img src={event.posterImage} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                ) : (
                    <div className="md:w-2/5 h-64 md:h-auto shrink-0 bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center text-white/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mx-20 -my-20 pointer-events-none" />
                        <Calendar className="w-16 h-16 opacity-30 drop-shadow-lg" />
                    </div>
                )}

                <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">{event.type.replace("_", " ")}</Badge>
                        <Badge variant="outline" className="text-muted-foreground">{event.format}</Badge>
                        {event.status === "CANCELLED" && <Badge variant="destructive">Cancelled</Badge>}
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                        {event.title}
                    </h1>

                    <div className="space-y-3 mb-8 mt-auto">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-foreground">{formatEventDate(event.startTime)}</p>
                                <p className="text-xs">to {formatEventDate(event.endTime)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-red-500" />
                            </div>
                            <p className="text-foreground">{event.venue || "Location TBA"}</p>
                        </div>
                    </div>

                    {/* Organizer Mini Card */}
                    <div className="flex items-center gap-3 p-3 rounded-xl border bg-accent/30 mt-auto">
                        <div className={`w-10 h-10 rounded-full ${generateAvatarColor(event.club.name)} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm border`}>
                            {getInitials(event.club.name)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground font-medium leading-none mb-1">Organized by</p>
                            <p className="font-semibold text-sm truncate">{event.club.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Col: Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="nexus-card p-6 md:p-8 space-y-4">
                        <h2 className="text-xl font-display font-semibold">About Event</h2>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground bg-accent/30 rounded-xl p-5 border leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </div>
                    </div>
                </div>

                {/* Right Col: Registration Card */}
                <div className="lg:col-span-1">
                    <div className="nexus-card p-6 sticky top-24 shadow-md border-primary/20 bg-gradient-to-b from-card to-accent/20">
                        <div className="flex items-center gap-2 font-display font-semibold text-lg mb-4">
                            <Ticket className="w-5 h-5 text-blue-500" /> Registration
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Price</span>
                                <span className="font-bold text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Registered</span>
                                <span className="font-medium flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-blue-500" />
                                    {event._count.registrations} {event.capacity ? `/ ${event.capacity}` : ""}
                                </span>
                            </div>
                        </div>

                        {registered ? (
                            <div className="w-full bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center space-y-1">
                                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 opacity-50 text-green-600" />
                                <p className="font-bold">You&apos;re Registered!</p>
                                <p className="text-xs font-medium">Status: {status}</p>
                            </div>
                        ) : isFull ? (
                            <Button disabled className="w-full h-12 shadow-sm" variant="secondary">Registration Full</Button>
                        ) : event.status === "CANCELLED" ? (
                            <Button disabled className="w-full h-12 shadow-sm" variant="destructive">Event Cancelled</Button>
                        ) : (
                            <Button
                                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-md transform transition-transform hover:scale-[1.02]"
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Now"}
                            </Button>
                        )}

                        <p className="text-[10px] text-center text-muted-foreground mt-4">
                            {event.requiresApproval ? "This event requires organizer approval after registration." : "Instant confirmation."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
