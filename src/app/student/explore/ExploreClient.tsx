"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, Users, Clock, MapPin, Globe, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatEventDate, getInitials, generateAvatarColor } from "@/lib/utils";

const EVENT_TYPES = ["All", "Workshop", "Hackathon", "Cultural", "Tech Talk", "Seminar"];
const EVENT_FORMATS = ["All", "Online", "Offline", "Hybrid"];

interface Event {
    id: string; title: string; startTime: Date; venue?: string | null;
    format: string; type: string; isPaid: boolean;
    club?: { name: string; logo?: string | null } | null;
    _count: { registrations: number };
}

interface Club {
    id: string; name: string; logo?: string | null; category?: string | null; description?: string | null;
    _count: { members: number; events: number };
}

export default function ExploreClient({ events, clubs }: { events: Event[]; clubs: Club[] }) {
    const [tab, setTab] = useState<"events" | "clubs">("events");
    const [search, setSearch] = useState("");
    const [eventType, setEventType] = useState("All");
    const [eventFormat, setEventFormat] = useState("All");

    const filteredEvents = events.filter((e) => {
        const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.club?.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = eventType === "All" || e.type === eventType.toUpperCase().replace(" ", "_");
        const matchesFormat = eventFormat === "All" || e.format === eventFormat.toUpperCase();
        return matchesSearch && matchesType && matchesFormat;
    });

    const filteredClubs = clubs.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-display font-bold mb-1">Explore</h1>
                <p className="text-muted-foreground text-sm">Discover events, clubs, and opportunities on campus</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit mb-6">
                {["events", "clubs"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t as "events" | "clubs")}
                        className={cn(
                            "px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                            tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Search + Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={tab === "events" ? "Search events..." : "Search clubs..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                {tab === "events" && (
                    <>
                        <div className="flex gap-1 flex-wrap">
                            {EVENT_TYPES.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setEventType(t)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors",
                                        eventType === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-1">
                            {EVENT_FORMATS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setEventFormat(f)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors",
                                        eventFormat === f ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Events Grid */}
            {tab === "events" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.length === 0 ? (
                        <div className="col-span-3 text-center py-16 text-muted-foreground">
                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No events found. Try changing your filters.</p>
                        </div>
                    ) : (
                        filteredEvents.map((event) => (
                            <Link key={event.id} href={`/events/${event.id}`}>
                                <div className="nexus-card overflow-hidden hover:border-primary/30 cursor-pointer group transition-all">
                                    {/* Poster area */}
                                    <div className="h-36 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative">
                                        <Calendar className="w-10 h-10 text-primary/30" />
                                        <div className="absolute top-3 right-3 flex gap-1.5">
                                            <Badge variant={event.isPaid ? "warning" : "success"} className="text-[10px]">
                                                {event.isPaid ? "Paid" : "Free"}
                                            </Badge>
                                            <Badge variant="outline" className="text-[10px] bg-white/80">
                                                {event.format.charAt(0) + event.format.slice(1).toLowerCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                            {event.title}
                                        </h3>
                                        <div className="space-y-1.5 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatEventDate(event.startTime)}
                                            </div>
                                            {event.venue && (
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {event.venue}
                                                </div>
                                            )}
                                            {event.club && (
                                                <div className="flex items-center gap-1.5">
                                                    <Zap className="w-3.5 h-3.5" />
                                                    {event.club.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5" />
                                                {event._count.registrations} attending
                                            </span>
                                            <Button size="sm" className="h-7 text-xs px-3">Register</Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}

            {/* Clubs Grid */}
            {tab === "clubs" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredClubs.length === 0 ? (
                        <div className="col-span-3 text-center py-16 text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p>No clubs found.</p>
                        </div>
                    ) : (
                        filteredClubs.map((club) => (
                            <div key={club.id} className="nexus-card overflow-hidden hover:border-primary/30 cursor-pointer group transition-all">
                                <div className="h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    {club.logo ? (
                                        <img src={club.logo} alt={club.name} className="w-16 h-16 rounded-xl object-cover" />
                                    ) : (
                                        <div className={`w-16 h-16 rounded-xl ${generateAvatarColor(club.name)} flex items-center justify-center text-white text-xl font-bold`}>
                                            {getInitials(club.name)}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{club.name}</h3>
                                        {club.category && <Badge variant="outline" className="text-[10px] flex-shrink-0">{club.category}</Badge>}
                                    </div>
                                    {club.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{club.description}</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-muted-foreground space-x-3">
                                            <span>{club._count.members} members</span>
                                            <span>{club._count.events} events</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-7 text-xs px-3">Follow</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
