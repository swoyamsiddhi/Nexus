"use client";

import { useState } from "react";
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
    { id: "NEW", label: "New Applied", color: "bg-slate-500" },
    { id: "REVIEW", label: "Under Review", color: "bg-blue-500" },
    { id: "INTERVIEW", label: "Interview", color: "bg-purple-500" },
    { id: "ACCEPTED", label: "Accepted", color: "bg-green-500" },
];

export default function OrganizerRecruitClient() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    return (
        <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col pt-4 lg:pt-8 bg-background">
            <div className="px-4 lg:px-8 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-end">
                    <div>
                        <h1 className="text-2xl font-display font-bold">Recruitment Pipeline</h1>
                        <p className="text-sm text-muted-foreground mt-1">Manage club applications and onboard new members</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm w-full sm:w-auto">
                        <Users2 className="w-4 h-4" /> Open New Position
                    </Button>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                    <div className="relative flex-1 min-w-[240px] max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search applicants..."
                            className="pl-9 h-11 bg-card shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="h-11 border border-input bg-card shadow-sm rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Technical Team">Technical Team</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design Lead">Design Lead</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-8 px-4 lg:px-8">
                <div className="flex gap-6 h-full min-w-max">
                    {STAGES.map((stage) => {
                        const stageApplicants = MOCK_APPLICANTS.filter(a => a.stage === stage.id && (roleFilter === "All" || a.role === roleFilter) && a.name.toLowerCase().includes(search.toLowerCase()));

                        return (
                            <div key={stage.id} className="w-80 flex flex-col h-full bg-accent/30 rounded-2xl border border-border/50 overflow-hidden">
                                <div className="p-4 border-b border-border/50 bg-card/50 flex items-center justify-between sticky top-0">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                                        <h3 className="font-semibold text-sm">{stage.label}</h3>
                                    </div>
                                    <Badge variant="secondary" className="bg-background">{stageApplicants.length}</Badge>
                                </div>

                                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                                    {stageApplicants.map(applicant => (
                                        <div key={applicant.id} className="nexus-card p-4 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors bg-card">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="outline" className="text-[10px] font-semibold bg-accent/50">
                                                    {applicant.role}
                                                </Badge>
                                                <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
                                            </div>

                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`w-10 h-10 rounded-full ${generateAvatarColor(applicant.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                    {getInitials(applicant.name)}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-semibold text-sm text-foreground truncate">{applicant.name}</h4>
                                                    <p className="text-xs text-muted-foreground truncate">{applicant.branch} · Year {applicant.year}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {applicant.skills.map(skill => (
                                                    <span key={skill} className="text-[10px] bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground truncate max-w-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                <Button variant="secondary" size="sm" className="flex-1 h-8 text-xs bg-primary/5 hover:bg-primary/10 text-primary">
                                                    View Profile
                                                </Button>
                                                {stage.id === "NEW" && (
                                                    <Button variant="outline" size="sm" className="h-8 px-2 border-green-200 text-green-600 hover:bg-green-50"><CheckCircle2 className="w-4 h-4" /></Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {stageApplicants.length === 0 && (
                                        <div className="h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-xs text-muted-foreground font-medium">
                                            Drop applicants here
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
