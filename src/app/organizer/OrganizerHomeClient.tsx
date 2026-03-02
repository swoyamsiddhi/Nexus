"use client";

import Link from "next/link";
import {
    Building2, Users, Calendar, TrendingUp, Plus, ArrowRight,
    BarChart3, Settings, Users2, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatEventDate, generateAvatarColor, getInitials } from "@/lib/utils";

export default function OrganizerHomeClient({ club, userName }: any) {
    const firstName = userName?.split(" ")[0] || "Organizer";

    if (!club) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10 text-purple-500" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-3">Pending Admin Approval</h1>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                    Your organizer account is under review by the campus administration. Once approved, you&apos;ll be able to create and manage your club.
                </p>
                <Button variant="outline" onClick={() => window.location.reload()}>Refresh Status</Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20">

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    {club.logo ? (
                        <img src={club.logo} className="w-16 h-16 rounded-2xl object-cover shadow-sm border" alt={club.name} />
                    ) : (
                        <div className={`w-16 h-16 rounded-2xl ${generateAvatarColor(club.name)} flex items-center justify-center text-white text-2xl font-bold shadow-sm`}>
                            {getInitials(club.name)}
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">
                            {club.name}
                        </h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] bg-purple-50 text-purple-700 border-purple-200">
                                {club.category}
                            </Badge>
                            <span>Welcome back, {firstName}</span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="w-4 h-4" /> Settings
                    </Button>
                    <Link href="/organizer/events/create">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-sm">
                            <Plus className="w-4 h-4" /> Create Event
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Members", value: club._count.members, icon: Users2, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Events Hosted", value: club._count.events, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { label: "Active Registrations", value: club.events.reduce((a: any, b: any) => a + b._count.registrations, 0), icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
                    { label: "Recruitment Applications", value: 12, icon: Mail, color: "text-orange-500", bg: "bg-orange-500/10" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="nexus-card p-5 flex flex-col gap-3">
                        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                            <div className="text-xs text-muted-foreground font-medium">{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Column: Upcoming Events */}
                <div className="lg:col-span-2 space-y-4 border rounded-2xl p-6 bg-card shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-500" /> Active Events
                        </h2>
                        <Link href="/organizer/events" className="text-sm text-primary hover:underline flex items-center gap-1">
                            Manage all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {club.events.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground bg-accent/50 rounded-xl border border-dashed text-sm">
                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p>No active events right now.</p>
                            <Link href="/organizer/events/create">
                                <Button variant="link" className="h-6 mt-1 text-purple-600">Create one</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {club.events.map((event: any) => (
                                <div key={event.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                                    <div>
                                        <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                                        <p className="text-xs text-muted-foreground flex gap-3">
                                            <span>{formatEventDate(event.startTime)}</span>
                                            <span>•</span>
                                            <span className="text-purple-600 font-medium">{event._count.registrations} Registrations</span>
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm">Manage</Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Recruitment & Quick Actions */}
                <div className="space-y-6">
                    <div className="border rounded-2xl p-6 bg-card shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" /> Recruitment
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span>Applications received</span>
                                    <span className="text-blue-600">12 / 50 cap</span>
                                </div>
                                <Progress value={24} className="h-2 bg-blue-100" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your club is currently accepting applications for Technical Team and Marketing.
                            </p>
                            <Link href="/organizer/recruit" className="block w-full">
                                <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                                    Open Recruitment Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="border rounded-2xl p-6 bg-card shadow-sm">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-green-500" /> Weekly Overview
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm border-b pb-2">
                                <span className="text-muted-foreground">Profile Views</span>
                                <span className="font-semibold text-green-600">+24%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b pb-2">
                                <span className="text-muted-foreground">New Members</span>
                                <span className="font-semibold">+3</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Event Engagement</span>
                                <span className="font-semibold">High</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
