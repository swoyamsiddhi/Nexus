"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen, Clock, MapPin, Building2, UserCircle, Target, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, formatEventDate, getMatchColor, getInitials, generateAvatarColor, parseJsonArray } from "@/lib/utils";

const RESEARCH_TYPES = ["All", "Internship", "Semester Project", "Thesis", "Research Assistant", "Reading Group"];

interface Opportunity {
    id: string; title: string; type: string; description?: string | null;
    duration?: string | null; timeCommitmentHours?: number | null;
    skillsRequired: string; compensationType: string;
    locationType: string; matchScore: number;
    faculty: {
        user: { name?: string | null; image?: string | null };
        designation?: string | null; department?: string | null;
    };
    _count: { applications: number };
}

export default function ResearchClient({ opportunities }: { opportunities: Opportunity[] }) {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");

    const filtered = opportunities.filter((opp) => {
        const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) ||
            opp.faculty.user.name?.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === "All" || opp.type.replace("_", " ") === filterType.toUpperCase();
        return matchesSearch && matchesType;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-display font-bold mb-1">Research Hub</h1>
                <p className="text-muted-foreground text-sm">Find research projects tailored to your skills and interests</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects, faculty, or topics..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {RESEARCH_TYPES.map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={cn(
                                "px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors",
                                filterType === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid lg:grid-cols-2 gap-5">
                {filtered.length === 0 ? (
                    <div className="col-span-2 text-center py-16 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30 text-green-500" />
                        <p>No research opportunities found.</p>
                    </div>
                ) : (
                    filtered.map((opp) => (
                        <div key={opp.id} className="nexus-card p-5 group hover:border-green-500/30 transition-all flex flex-col h-full cursor-pointer">
                            <div className="flex justify-between items-start gap-4 mb-4">
                                <div className="flex gap-3 min-w-0 flex-1">
                                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-100">
                                        {opp.faculty.user.image ? (
                                            <img src={opp.faculty.user.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                        ) : (
                                            <div className={`w-12 h-12 rounded-xl ${generateAvatarColor(opp.faculty.user.name || "")} flex items-center justify-center text-white text-sm font-bold`}>
                                                {getInitials(opp.faculty.user.name || "?")}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-foreground group-hover:text-green-600 transition-colors line-clamp-1">
                                            {opp.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                            <UserCircle className="w-3.5 h-3.5" />
                                            <span className="truncate">{opp.faculty.user.name}</span>
                                            <span className="text-border">•</span>
                                            <span className="truncate">{opp.faculty.department}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Match Score Badge */}
                                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                                    <div className={`px-2.5 py-1 rounded-xl border text-sm font-bold font-display ${getMatchColor(opp.matchScore)}`}>
                                        {opp.matchScore}% Match
                                    </div>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
                                        {opp._count.applications} applied
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="bg-green-50/50 text-green-700 border-green-200">
                                    {opp.type.replace("_", " ")}
                                </Badge>
                                <Badge variant={opp.compensationType === "PAID" ? "success" : "secondary"}>
                                    {opp.compensationType}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="w-3 h-3" /> {opp.locationType}
                                </Badge>
                                {opp.timeCommitmentHours && (
                                    <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="w-3 h-3" /> {opp.timeCommitmentHours}h/wk
                                    </Badge>
                                )}
                            </div>

                            {opp.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                    {opp.description}
                                </p>
                            )}

                            <div className="mt-auto pt-4 border-t flex flex-col gap-3">
                                <div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium mb-1.5">
                                        <Target className="w-3.5 h-3.5" /> Required Skills
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {parseJsonArray(opp.skillsRequired).slice(0, 4).map(skill => (
                                            <span key={skill} className="text-[10px] px-2 py-0.5 rounded-md bg-accent text-accent-foreground font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                        {parseJsonArray(opp.skillsRequired).length > 4 && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-md text-muted-foreground">
                                                +{parseJsonArray(opp.skillsRequired).length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm">
                                        Apply Now
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
