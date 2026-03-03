"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users2, Search, Filter, Mail, CheckCircle2, XCircle, MoreVertical, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInitials, generateAvatarColor } from "@/lib/utils";

const MOCK_APPLICANTS = [
    { id: "1", name: "Alex Kumar", role: "Technical Team", stage: "REVIEW", skills: ["React", "Node.js"], year: 2, branch: "CSE" },
    { id: "2", name: "Sarah Singh", role: "Marketing", stage: "INTERVIEW", skills: ["Social Media", "Design"], year: 1, branch: "BBA" },
    { id: "3", name: "Rahul Patel", role: "Technical Team", stage: "NEW", skills: ["Python", "ML"], year: 3, branch: "ECE" },
    { id: "4", name: "Priya Das", role: "Design Lead", stage: "ACCEPTED", skills: ["Figma", "UI/UX"], year: 2, branch: "CSE" },
    { id: "5", name: "Amit Sharma", role: "Event Management", stage: "REJECTED", skills: ["Public Speaking", "Logistics"], year: 1, branch: "MECH" },
];

const STAGES = [
    { id: "NEW", label: "New Applied", color: "bg-slate-400", dotGlow: "shadow-slate-400/30", border: "border-slate-500/20" },
    { id: "REVIEW", label: "Under Review", color: "bg-blue-500", dotGlow: "shadow-blue-500/30", border: "border-blue-500/20" },
    { id: "INTERVIEW", label: "Interview", color: "bg-purple-500", dotGlow: "shadow-purple-500/30", border: "border-purple-500/20" },
    { id: "ACCEPTED", label: "Accepted", color: "bg-green-500", dotGlow: "shadow-green-500/30", border: "border-green-500/20" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function OrganizerRecruitClient() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col pt-4 lg:pt-8 bg-background"
        >
            <motion.div variants={fadeInUp} className="px-4 lg:px-8 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-end">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
                            <Users2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold tracking-tight">Recruitment Pipeline</h1>
                            <p className="text-sm text-muted-foreground font-medium mt-0.5">Manage club applications and onboard new members</p>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-lg shadow-blue-500/15 rounded-xl font-semibold w-full sm:w-auto">
                        <Users2 className="w-4 h-4" /> Open New Position
                    </Button>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                    <div className="relative flex-1 min-w-[240px] max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search applicants..."
                            className="pl-10 h-12 bg-card border-border/50 shadow-sm rounded-xl font-medium focus-visible:ring-blue-500/30"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="h-12 border border-border/50 bg-card shadow-sm rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Technical Team">Technical Team</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design Lead">Design Lead</option>
                    </select>
                </div>
            </motion.div>

            <div className="flex-1 overflow-x-auto pb-8 px-4 lg:px-8">
                <motion.div variants={staggerContainer} className="flex gap-5 h-full min-w-max">
                    {STAGES.map((stage) => {
                        const stageApplicants = MOCK_APPLICANTS.filter(a => a.stage === stage.id && (roleFilter === "All" || a.role === roleFilter) && a.name.toLowerCase().includes(search.toLowerCase()));

                        return (
                            <motion.div key={stage.id} variants={fadeInUp} className={`w-80 flex flex-col h-full bg-accent/20 rounded-2xl border ${stage.border} overflow-hidden`}>
                                <div className="p-4 border-b border-border/30 bg-card/60 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
                                    <div className="flex items-center gap-2.5">
                                        <span className={`w-2.5 h-2.5 rounded-full ${stage.color} shadow-sm ${stage.dotGlow}`} />
                                        <h3 className="font-bold text-sm">{stage.label}</h3>
                                    </div>
                                    <Badge variant="secondary" className="bg-accent border border-border/50 font-bold text-xs">
                                        {stageApplicants.length}
                                    </Badge>
                                </div>

                                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                                    {stageApplicants.map((applicant, i) => (
                                        <motion.div
                                            key={applicant.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ y: -2 }}
                                            className="bg-card border border-border/50 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:shadow-lg hover:border-primary/20 transition-all duration-200 group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <Badge variant="outline" className="text-[10px] font-bold bg-accent/50 border-border/50">
                                                    {applicant.role}
                                                </Badge>
                                                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`w-10 h-10 rounded-xl ${generateAvatarColor(applicant.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm border border-black/10 group-hover:scale-105 transition-transform`}>
                                                    {getInitials(applicant.name)}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{applicant.name}</h4>
                                                    <p className="text-xs text-muted-foreground truncate font-medium">{applicant.branch} · Year {applicant.year}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {applicant.skills.map(skill => (
                                                    <span key={skill} className="text-[10px] bg-accent border border-border/50 px-2 py-0.5 rounded-md text-accent-foreground font-semibold truncate max-w-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                <Button variant="secondary" size="sm" className="flex-1 h-8 text-xs bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-lg font-semibold">
                                                    View Profile
                                                </Button>
                                                {stage.id === "NEW" && (
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-green-500/10 hover:bg-green-500/20 border-green-500/20 text-green-400 rounded-lg">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {stageApplicants.length === 0 && (
                                        <div className="h-24 border-2 border-dashed border-border/30 rounded-xl flex items-center justify-center text-xs text-muted-foreground font-medium">
                                            Drop applicants here
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    );
}
