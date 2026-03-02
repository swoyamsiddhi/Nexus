"use client";

import { useState } from "react";
import { Users, BookOpen, CheckCircle2, XCircle, Clock, MoreVertical, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials, generateAvatarColor, parseJsonArray } from "@/lib/utils";

const APP_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pending", color: "badge-warning" },
    ACCEPTED: { label: "Accepted", color: "badge-success" },
    REJECTED: { label: "Rejected", color: "badge-destructive" },
    SHORTLISTED: { label: "Shortlisted", color: "badge-info" },
};

export default function FacultyApplicationsClient({ opportunities }: any) {
    const [selectedOpp, setSelectedOpp] = useState(opportunities[0]?.id || null);

    const currentOpp = opportunities.find((o: any) => o.id === selectedOpp);
    const applications = currentOpp?.applications || [];

    const handleStatusChange = async (applicationId: string, status: string) => {
        await fetch(`/api/applications/${applicationId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        // In production, invalidate TanStack Query cache here
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-display font-bold">Applications</h1>
                <p className="text-sm text-muted-foreground mt-1">Review and manage student applications to your research positions</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Opportunity selector */}
                <div className="lg:col-span-1 space-y-2">
                    {opportunities.length === 0 ? (
                        <div className="nexus-card p-6 text-center text-muted-foreground text-sm">
                            No opportunities posted yet.
                        </div>
                    ) : (
                        opportunities.map((opp: any) => (
                            <button
                                key={opp.id}
                                onClick={() => setSelectedOpp(opp.id)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all",
                                    selectedOpp === opp.id
                                        ? "border-green-500/50 bg-green-50/50 ring-1 ring-green-500/20"
                                        : "border-border bg-card hover:bg-accent/50"
                                )}
                            >
                                <h3 className="font-semibold text-sm text-foreground line-clamp-1 mb-1">{opp.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant={opp.status === "OPEN" ? "success" : "secondary"} className="text-[9px] h-4 px-1.5">
                                        {opp.status}
                                    </Badge>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {opp.applications.length} applicants
                                    </span>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Right: Application list */}
                <div className="lg:col-span-2">
                    {!currentOpp ? (
                        <div className="nexus-card p-12 text-center text-muted-foreground flex flex-col items-center">
                            <BookOpen className="w-12 h-12 opacity-20 mb-4" />
                            <p>Select an opportunity to view its applications.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-foreground">{currentOpp.title}</h2>
                                <span className="text-sm text-muted-foreground">{applications.length} applications</span>
                            </div>

                            {applications.length === 0 ? (
                                <div className="nexus-card p-10 text-center text-muted-foreground text-sm flex flex-col items-center">
                                    <Users className="w-10 h-10 opacity-20 mb-3" />
                                    <p>No applications yet. Share your opportunity!</p>
                                </div>
                            ) : (
                                applications.map((app: any) => {
                                    const studentSkills = parseJsonArray(app.student?.studentProfile?.skills);
                                    const reqSkills = parseJsonArray(currentOpp.skillsRequired);
                                    const matchCount = studentSkills.filter((s: string) => reqSkills.some((r: string) => r.toLowerCase() === s.toLowerCase())).length;
                                    const matchPct = reqSkills.length ? Math.round((matchCount / reqSkills.length) * 100) : 0;

                                    return (
                                        <div key={app.id} className="nexus-card p-5 group hover:border-green-500/30 transition-all">
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="flex gap-3 min-w-0 flex-1">
                                                    <div className={`w-11 h-11 rounded-full ${generateAvatarColor(app.student?.name || "")} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                                        {getInitials(app.student?.name || "?")}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-foreground truncate">{app.student?.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {app.student?.studentProfile?.branch} · Year {app.student?.studentProfile?.year}
                                                            {app.student?.studentProfile?.cgpa && ` · CGPA ${app.student.studentProfile.cgpa.toFixed(2)}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className={`text-sm font-bold px-2 py-0.5 rounded-lg border ${matchPct >= 70 ? "text-green-700 bg-green-50 border-green-200" :
                                                        matchPct >= 40 ? "text-yellow-700 bg-yellow-50 border-yellow-200" :
                                                            "text-slate-600 bg-slate-50 border-slate-200"
                                                        }`}>
                                                        {matchPct}%
                                                    </span>
                                                    <span className={`text-[11px] px-2 py-1 rounded-full font-semibold ${APP_STATUS_CONFIG[app.status]?.color || "badge-neutral"
                                                        }`}>
                                                        {APP_STATUS_CONFIG[app.status]?.label || app.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {app.coverLetter && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 bg-accent/40 rounded-lg p-3 italic">
                                                    &ldquo;{app.coverLetter}&rdquo;
                                                </p>
                                            )}

                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {studentSkills.slice(0, 5).map((skill: string) => (
                                                    <span key={skill} className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${reqSkills.some((r: string) => r.toLowerCase() === skill.toLowerCase())
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : "bg-accent text-muted-foreground border-transparent"
                                                        }`}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            {app.status === "SUBMITTED" && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 h-9 gap-1.5 border-green-200 text-green-700 hover:bg-green-50"
                                                        onClick={() => handleStatusChange(app.id, "ACCEPTED")}
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" /> Accept
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 h-9 gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50"
                                                        onClick={() => handleStatusChange(app.id, "SHORTLISTED")}
                                                    >
                                                        <Clock className="w-4 h-4" /> Shortlist
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="px-3 h-9 gap-1.5 border-red-200 text-red-700 hover:bg-red-50"
                                                        onClick={() => handleStatusChange(app.id, "REJECTED")}
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="px-3 h-9 text-muted-foreground">
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
