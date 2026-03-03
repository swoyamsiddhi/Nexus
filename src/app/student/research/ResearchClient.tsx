"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Search, BookOpen, Clock, MapPin, UserCircle, Target, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getMatchColor, getInitials, generateAvatarColor, parseJsonArray } from "@/lib/utils";

const RESEARCH_TYPES = ["All", "Internship", "Semester Project", "Thesis", "Research Assistant", "Reading Group"];

const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-6xl mx-auto px-4 py-8 lg:px-8"
        >
            <motion.div variants={fadeInUp} className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/10">
                        <Sparkles className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold tracking-tight">Research Hub</h1>
                        <p className="text-muted-foreground text-sm font-medium">Find research projects tailored to your skills and interests</p>
                    </div>
                </div>
            </motion.div>

            {/* Search & Filters */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-8">
                <div className="relative flex-1 min-w-64">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects, faculty, or topics..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-12 bg-card border-border/50 shadow-sm rounded-xl font-medium focus-visible:ring-green-500/30"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {RESEARCH_TYPES.map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={cn(
                                "px-4 py-2 text-xs rounded-xl border font-semibold transition-all duration-200",
                                filterType === t
                                    ? "bg-green-500/10 text-green-400 border-green-500/20 shadow-sm"
                                    : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Grid */}
            <motion.div variants={staggerContainer} className="grid lg:grid-cols-2 gap-5">
                {filtered.length === 0 ? (
                    <motion.div variants={fadeInUp} className="col-span-2 text-center py-20 text-muted-foreground">
                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border/50">
                            <BookOpen className="w-8 h-8 opacity-40" />
                        </div>
                        <p className="font-semibold text-foreground">No research opportunities found.</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                    </motion.div>
                ) : (
                    filtered.map((opp) => (
                        <motion.div
                            key={opp.id}
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                            className="bg-card border border-border/50 rounded-2xl p-5 group hover:shadow-lg hover:border-green-500/20 transition-all duration-300 flex flex-col h-full cursor-pointer"
                        >
                            <div className="flex justify-between items-start gap-4 mb-4">
                                <div className="flex gap-3 min-w-0 flex-1">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-border/50 group-hover:scale-105 transition-transform">
                                        {opp.faculty.user.image ? (
                                            <img src={opp.faculty.user.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                        ) : (
                                            <div className={`w-12 h-12 rounded-xl ${generateAvatarColor(opp.faculty.user.name || "")} flex items-center justify-center text-white text-sm font-bold`}>
                                                {getInitials(opp.faculty.user.name || "?")}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-foreground group-hover:text-green-500 transition-colors line-clamp-1">
                                            {opp.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5 font-medium">
                                            <UserCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="truncate">{opp.faculty.user.name}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                                            <span className="truncate">{opp.faculty.department}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Match Score Badge */}
                                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                                    <div className={`px-3 py-1.5 rounded-xl border text-sm font-bold font-display ${getMatchColor(opp.matchScore)}`}>
                                        {opp.matchScore}%
                                    </div>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                                        {opp._count.applications} applied
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 font-semibold">
                                    {opp.type.replace("_", " ")}
                                </Badge>
                                <Badge variant={opp.compensationType === "PAID" ? "success" : "secondary"} className="font-semibold">
                                    {opp.compensationType}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground font-medium">
                                    <MapPin className="w-3 h-3" /> {opp.locationType}
                                </Badge>
                                {opp.timeCommitmentHours && (
                                    <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground font-medium">
                                        <Clock className="w-3 h-3" /> {opp.timeCommitmentHours}h/wk
                                    </Badge>
                                )}
                            </div>

                            {opp.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                                    {opp.description}
                                </p>
                            )}

                            <div className="mt-auto pt-4 border-t border-border/30 flex flex-col gap-4">
                                <div>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold mb-2">
                                        <Target className="w-3.5 h-3.5 text-green-400" /> Required Skills
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {parseJsonArray(opp.skillsRequired).slice(0, 4).map(skill => (
                                            <span key={skill} className="text-[10px] px-2 py-1 rounded-md bg-accent border border-border/50 text-accent-foreground font-semibold">
                                                {skill}
                                            </span>
                                        ))}
                                        {parseJsonArray(opp.skillsRequired).length > 4 && (
                                            <span className="text-[10px] px-2 py-1 rounded-md text-muted-foreground font-medium">
                                                +{parseJsonArray(opp.skillsRequired).length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/15 rounded-xl font-semibold">
                                        Apply Now
                                    </Button>
                                    <Button variant="outline" className="flex-1 rounded-xl border-border/50 hover:bg-accent/50 font-semibold">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </motion.div>
    );
}
