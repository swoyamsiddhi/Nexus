"use client";

import Link from "next/link";
import {
    Calendar, Users, BookOpen, ArrowRight, Clock,
    UserCheck, TrendingUp, Zap, ExternalLink, MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseJsonArray, formatEventDate, getInitials, generateAvatarColor, getMatchColor, timeAgo } from "@/lib/utils";

interface StudentHomeClientProps {
    userName: string;
    profile: {
        branch?: string | null;
        year?: number | null;
        availabilityStatus?: string;
        skills?: string;
    } | null;
    upcomingEvents: Array<{
        id: string;
        title: string;
        startTime: Date;
        venue?: string | null;
        format: string;
        type: string;
        club?: { name: string; logo?: string | null } | null;
        _count: { registrations: number };
    }>;
    recentConnections: Array<{
        id: string;
        name?: string | null;
        image?: string | null;
        studentProfile?: {
            branch?: string | null;
            year?: number | null;
            skills?: string;
            availabilityStatus?: string;
        } | null;
    }>;
    opportunities: Array<{
        id: string;
        title: string;
        type: string;
        compensationType: string;
        matchScore: number;
        faculty: {
            user: { name?: string | null; image?: string | null };
            department?: string | null;
        };
    }>;
    clubs: Array<{
        id: string;
        name: string;
        logo?: string | null;
        category?: string | null;
        _count: { members: number };
    }>;
}

const eventTypeColors: Record<string, string> = {
    WORKSHOP: "badge-info",
    HACKATHON: "badge-warning",
    CULTURAL: "badge-success",
    TECH_TALK: "badge-info",
    SEMINAR: "badge-neutral",
    CUSTOM: "badge-neutral",
};

export default function StudentHomeClient({
    userName, profile, upcomingEvents, recentConnections, opportunities, clubs
}: StudentHomeClientProps) {
    const firstName = userName.split(" ")[0];
    const skills = parseJsonArray(profile?.skills);
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 lg:px-8 space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">
                        {greeting}, {firstName}! 👋
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {profile?.branch && profile?.year
                            ? `Year ${profile.year} · ${profile.branch}`
                            : "Complete your profile to get personalized suggestions"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${profile?.availabilityStatus === "OPEN"
                            ? "bg-green-100 text-green-700"
                            : profile?.availabilityStatus === "LOOKING_FOR_TEAM"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                        }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1.5" />
                        {profile?.availabilityStatus === "OPEN" ? "Open to Collaborate"
                            : profile?.availabilityStatus === "LOOKING_FOR_TEAM" ? "Looking for Team"
                                : "Busy"}
                    </div>
                </div>
            </div>

            {/* Today's Nexus - Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { icon: Calendar, label: "Upcoming Events", value: upcomingEvents.length, color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: Users, label: "Connections", value: recentConnections.length, color: "text-purple-500", bg: "bg-purple-50" },
                    { icon: BookOpen, label: "Research Matches", value: opportunities.length, color: "text-green-600", bg: "bg-green-50" },
                    { icon: TrendingUp, label: "Your Skills", value: skills.length, color: "text-orange-500", bg: "bg-orange-50" },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className="nexus-card p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                            <div className="text-xs text-muted-foreground">{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming Events */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            Upcoming Events
                        </h2>
                        <Link href="/student/explore" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {upcomingEvents.length === 0 ? (
                        <div className="nexus-card p-8 text-center">
                            <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                            <p className="text-muted-foreground text-sm">No upcoming events. Check Explore!</p>
                            <Link href="/student/explore">
                                <Button size="sm" className="mt-3">Explore Events</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {upcomingEvents.map((event) => (
                                <Link key={event.id} href={`/events/${event.id}`}>
                                    <div className="nexus-card p-4 flex items-start gap-4 cursor-pointer hover:border-primary/30 transition-colors">
                                        <div className="w-12 h-12 bg-student-light rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                            <div className="text-xs text-blue-600 font-bold leading-none">
                                                {new Date(event.startTime).toLocaleDateString("en", { day: "2-digit" })}
                                            </div>
                                            <div className="text-[10px] text-blue-500 uppercase">
                                                {new Date(event.startTime).toLocaleDateString("en", { month: "short" })}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-2 flex-wrap">
                                                <h3 className="font-semibold text-sm text-foreground">{event.title}</h3>
                                                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${eventTypeColors[event.type] || "badge-neutral"}`}>
                                                    {event.type.replace("_", " ")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                {event.club && (
                                                    <span className="text-xs text-muted-foreground">{event.club.name}</span>
                                                )}
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3" />
                                                    {formatEventDate(event.startTime)}
                                                </span>
                                                {event.venue && (
                                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <MapPin className="w-3 h-3" />
                                                        {event.venue}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground text-right flex-shrink-0">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {event._count.registrations}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Research Opportunities */}
                    <div className="flex items-center justify-between mt-6">
                        <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-600" />
                            Research Matches
                        </h2>
                        <Link href="/student/research" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {opportunities.length === 0 ? (
                        <div className="nexus-card p-6 text-center">
                            <p className="text-muted-foreground text-sm">Add skills to your profile to get research matches.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {opportunities.map((opp) => (
                                <Link key={opp.id} href={`/student/research?opp=${opp.id}`}>
                                    <div className="nexus-card p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                            {opp.faculty.user.image ? (
                                                <img src={opp.faculty.user.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                            ) : (
                                                <div className={`w-10 h-10 rounded-xl ${generateAvatarColor(opp.faculty.user.name || "")} flex items-center justify-center text-white text-xs font-bold`}>
                                                    {getInitials(opp.faculty.user.name || "?")}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm text-foreground truncate">{opp.title}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {opp.faculty.user.name} · {opp.faculty.department}
                                            </p>
                                            <div className="flex gap-2 mt-1">
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                    {opp.type.replace("_", " ")}
                                                </Badge>
                                                <Badge variant={opp.compensationType === "PAID" ? "success" : "secondary"} className="text-[10px] px-1.5 py-0">
                                                    {opp.compensationType}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-bold px-2.5 py-1 rounded-full border font-display ${getMatchColor(opp.matchScore)}`}>
                                            {opp.matchScore}%
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column: Suggested People & Clubs */}
                <div className="space-y-6">
                    {/* Suggested Connections */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-purple-500" />
                                Suggested
                            </h2>
                            <Link href="/student/nexus?tab=connections" className="text-sm text-primary hover:underline">
                                See all
                            </Link>
                        </div>
                        <div className="space-y-2">
                            {recentConnections.length === 0 ? (
                                <div className="nexus-card p-4 text-center text-sm text-muted-foreground">
                                    No connections yet
                                </div>
                            ) : (
                                recentConnections.map((user) => (
                                    <div key={user.id} className="nexus-card p-3 flex items-center gap-3">
                                        {user.image ? (
                                            <img src={user.image} className="w-9 h-9 rounded-full object-cover" alt="" />
                                        ) : (
                                            <div className={`w-9 h-9 rounded-full ${generateAvatarColor(user.name || "")} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                {getInitials(user.name || "?")}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {user.studentProfile?.branch || "Campus Member"} · Year {user.studentProfile?.year || "?"}
                                            </p>
                                            {user.studentProfile?.skills && (
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {parseJsonArray(user.studentProfile.skills).slice(0, 2).map((s) => (
                                                        <span key={s} className="text-[10px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground">{s}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Button size="sm" variant="outline" className="text-xs px-2 h-7 flex-shrink-0">
                                            Connect
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Clubs You Might Like */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                                <Zap className="w-5 h-5 text-orange-500" />
                                Clubs
                            </h2>
                            <Link href="/student/explore?tab=clubs" className="text-sm text-primary hover:underline">
                                See all
                            </Link>
                        </div>
                        <div className="space-y-2">
                            {clubs.slice(0, 4).map((club) => (
                                <div key={club.id} className="nexus-card p-3 flex items-center gap-3">
                                    {club.logo ? (
                                        <img src={club.logo} className="w-9 h-9 rounded-xl object-cover" alt={club.name} />
                                    ) : (
                                        <div className={`w-9 h-9 rounded-xl ${generateAvatarColor(club.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                            {getInitials(club.name)}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">{club.name}</p>
                                        <p className="text-xs text-muted-foreground">{club._count.members} members</p>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-xs px-2 h-7 flex-shrink-0 text-primary">
                                        Follow
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
