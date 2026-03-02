"use client";

import Link from "next/link";
import {
    FlaskConical, BookOpen, Users, Plus, ArrowRight,
    TrendingUp, Clock, MapPin, CheckCircle2, PenLine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInitials, generateAvatarColor } from "@/lib/utils";

export default function FacultyHomeClient({ profile, opportunities, userName }: any) {
    const firstName = userName?.split(" ")[0] || "Professor";

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FlaskConical className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-3">Pending Admin Verification</h1>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Your faculty account is being reviewed by campus administration. You&apos;ll receive access once approved.
                </p>
                <Button variant="outline">Check Status</Button>
            </div>
        );
    }

    const totalApplications = opportunities.reduce((sum: number, opp: any) => sum + opp._count.applications, 0);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20">

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${generateAvatarColor(userName)} flex items-center justify-center text-white text-2xl font-bold shadow-sm`}>
                        {getInitials(userName)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold">Welcome, Prof. {firstName}</h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            {profile.designation || "Faculty"} · {profile.department}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href="/faculty/publish">
                        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-sm w-full sm:w-auto">
                            <Plus className="w-4 h-4" /> Post Opportunity
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Opportunities Posted", value: opportunities.length, icon: BookOpen, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Total Applications", value: totalApplications, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Students in Lab", value: profile.lab ? "–" : "–", icon: FlaskConical, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Open Positions", value: opportunities.filter((o: any) => o.status === "OPEN").length, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="nexus-card p-5">
                        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-0.5">{label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Opportunities */}
                <div className="lg:col-span-2 border rounded-2xl p-6 bg-card shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-600" /> My Opportunities
                        </h2>
                        <Link href="/faculty/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View Applications <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {opportunities.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground bg-accent/50 rounded-xl border border-dashed text-sm">
                            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            No research opportunities posted yet.
                            <Link href="/faculty/publish">
                                <Button variant="link" className="h-6 mt-1 text-green-600 block mx-auto">Post one now</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {opportunities.map((opp: any) => (
                                <div key={opp.id} className="flex items-center justify-between gap-4 p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className="font-semibold text-sm line-clamp-1">{opp.title}</h3>
                                            <Badge variant={opp.status === "OPEN" ? "success" : "secondary"} className="text-[10px] h-4 px-1.5 py-0 shrink-0">
                                                {opp.status}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                                            <span>{opp.type.replace("_", " ")}</span>
                                            <span className="text-border">•</span>
                                            <span className="font-medium text-blue-600 flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {opp._count.applications} applications
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                                            <PenLine className="w-3.5 h-3.5" /> Edit
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Lab Profile */}
                <div className="border rounded-2xl p-6 bg-card shadow-sm space-y-4">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-teal-500" /> Lab Info
                    </h2>
                    {profile.lab ? (
                        <div className="space-y-3">
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">{profile.lab.name}</p>
                                <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                                    <MapPin className="w-3.5 h-3.5" /> {profile.lab.location || "Location TBD"}
                                </p>
                                {profile.lab.description && (
                                    <p className="mt-2 text-xs text-muted-foreground">{profile.lab.description}</p>
                                )}
                            </div>
                            <Button variant="outline" className="w-full h-9 text-sm">Manage Lab</Button>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground">
                            <FlaskConical className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No lab set up yet.</p>
                            <Button variant="link" className="text-green-600 h-6">Create Lab Profile</Button>
                        </div>
                    )}

                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" /> Office Hours
                        </h3>
                        {profile.officeHours ? (
                            <p className="text-sm text-muted-foreground">{profile.officeHours}</p>
                        ) : (
                            <Button variant="outline" className="w-full h-8 text-xs">Set Office Hours</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
