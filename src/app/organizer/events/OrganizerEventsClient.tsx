"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Calendar, Search, MapPin, Clock, Edit2, BarChart2, Users, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatEventDate } from "@/lib/utils";

export default function OrganizerEventsClient({ events, clubId }: any) {
    const [search, setSearch] = useState("");

    const filtered = events.filter((e: any) => e.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-6">

            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-end">
                <div>
                    <h1 className="text-2xl font-display font-bold">Event Management</h1>
                    <p className="text-sm text-muted-foreground mt-1">Create, manage, and track your club&apos;s events</p>
                </div>
                <Link href="/organizer/events/create">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-sm w-full sm:w-auto">
                        <Plus className="w-4 h-4" /> New Event
                    </Button>
                </Link>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search events..."
                    className="pl-9 h-11"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid gap-4">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground border rounded-2xl bg-card">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No events found.</p>
                    </div>
                ) : (
                    filtered.map((event: any) => (
                        <div key={event.id} className="nexus-card p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:border-purple-500/30 transition-colors">
                            <div className="flex gap-4 items-start min-w-0 flex-1">
                                <div className="w-14 h-14 bg-purple-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-purple-100">
                                    <div className="text-sm text-purple-700 font-bold leading-none">
                                        {new Date(event.startTime).toLocaleDateString("en", { day: "2-digit" })}
                                    </div>
                                    <div className="text-[10px] text-purple-600 uppercase font-medium mt-0.5">
                                        {new Date(event.startTime).toLocaleDateString("en", { month: "short" })}
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="font-semibold text-foreground text-lg truncate">{event.title}</h3>
                                        <Badge variant={event.status === "PUBLISHED" ? "success" : "secondary"} className="text-[10px] py-0 h-5">
                                            {event.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatEventDate(event.startTime)}</span>
                                        <span className="text-border">•</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.venue || "TBA"}</span>
                                        <span className="text-border">•</span>
                                        <Badge variant="outline" className="text-[9px] uppercase tracking-wider h-4 px-1.5 font-semibold bg-background">{event.format}</Badge>
                                        <Badge variant="outline" className="text-[9px] uppercase tracking-wider h-4 px-1.5 font-semibold bg-background">{event.type.replace("_", " ")}</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto md:justify-end mt-2 md:mt-0">
                                <div className="flex gap-4 mr-2">
                                    <div className="text-center">
                                        <div className="text-xs text-muted-foreground mb-0.5 font-medium flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Reg</div>
                                        <div className="font-semibold">{event._count.registrations}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-muted-foreground mb-0.5 font-medium flex items-center gap-1"><Users className="w-3.5 h-3.5 overflow-hidden text-transparent bg-clip-text" /> Cap</div>
                                        <div className="font-semibold text-muted-foreground">{event.capacity || "∞"}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-auto">
                                    <Button variant="outline" size="icon" className="h-9 w-9"><BarChart2 className="w-4 h-4 text-primary" /></Button>
                                    <Button variant="outline" size="icon" className="h-9 w-9"><Edit2 className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><MoreVertical className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
