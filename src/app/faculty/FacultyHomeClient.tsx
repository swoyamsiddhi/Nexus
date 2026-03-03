"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FlaskConical, BookOpen, Users, Plus, ArrowRight,
    TrendingUp, Clock, MapPin, PenLine, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInitials, generateAvatarColor } from "@/lib/utils";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function FacultyHomeClient({ profile, opportunities, userName }: any) {
    const firstName = userName?.split(" ")[0] || "Professor";

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-500/10">
                        <FlaskConical className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-3xl font-display font-bold mb-3">Pending Admin Verification</h1>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        Your faculty account is being reviewed by campus administration. You&apos;ll receive access once approved.
                    </p>
                    <Button variant="outline" className="rounded-xl">Check Status</Button>
                </motion.div>
            </div>
        );
    }

    const totalApplications = opportunities.reduce((sum: number, opp: any) => sum + opp._count.applications, 0);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20"
        >
            {/* Header */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${generateAvatarColor(userName)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                        {getInitials(userName)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold tracking-tight">Welcome, Prof. {firstName}</h1>
                        <p className="text-muted-foreground text-sm mt-1 font-medium">
                            {profile.designation || "Faculty"} · {profile.department}
                        </p>
                    </div>
                </div>
                <Link href="/faculty/publish">
                    <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white gap-2 shadow-lg shadow-green-500/15 rounded-xl font-semibold w-full sm:w-auto">
                        <Plus className="w-4 h-4" /> Post Opportunity
                    </Button>
                </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Opportunities Posted", value: opportunities.length, icon: BookOpen, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/10" },
                    { label: "Total Applications", value: totalApplications, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/10" },
                    { label: "Students in Lab", value: profile.lab ? "–" : "–", icon: FlaskConical, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/10" },
                    { label: "Open Positions", value: opportunities.filter((o: any) => o.status === "OPEN").length, icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/10" },
                ].map(({ label, value, icon: Icon, color, bg, border }) => (
                    <motion.div key={label} variants={fadeInUp} className={`group bg-card border ${border} rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}>
                        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div className="text-3xl font-display font-bold text-foreground tracking-tight">{value}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-0.5">{label}</div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Opportunities */}
                <motion.div variants={fadeInUp} className="lg:col-span-2 bg-card border border-border/50 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-green-400" />
                            </div>
                            My Opportunities
                        </h2>
                        <Link href="/faculty/applications" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                            View Applications <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {opportunities.length === 0 ? (
                        <div className="text-center py-14 text-muted-foreground bg-accent/30 rounded-xl border border-dashed border-border/50 text-sm">
                            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="font-medium">No research opportunities posted yet.</p>
                            <Link href="/faculty/publish">
                                <Button variant="link" className="h-6 mt-2 text-green-400 font-semibold">Post one now →</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {opportunities.map((opp: any, i: number) => (
                                <motion.div
                                    key={opp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex items-center justify-between gap-4 p-4 border border-border/40 rounded-xl hover:bg-accent/40 hover:border-border transition-all duration-200"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                            <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{opp.title}</h3>
                                            <Badge variant={opp.status === "OPEN" ? "success" : "secondary"} className="text-[10px] h-4 px-1.5 py-0 shrink-0">
                                                {opp.status}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-3 text-xs text-muted-foreground flex-wrap items-center">
                                            <span>{opp.type.replace("_", " ")}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                            <span className="font-semibold text-blue-400 flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {opp._count.applications} applications
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 gap-1 text-xs rounded-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                        <PenLine className="w-3.5 h-3.5" /> Edit
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Lab Profile */}
                <motion.div variants={fadeInUp} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                            <FlaskConical className="w-4 h-4 text-teal-400" />
                        </div>
                        Lab Info
                    </h2>
                    {profile.lab ? (
                        <div className="space-y-3">
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">{profile.lab.name}</p>
                                <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                                    <MapPin className="w-3.5 h-3.5" /> {profile.lab.location || "Location TBD"}
                                </p>
                                {profile.lab.description && (
                                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{profile.lab.description}</p>
                                )}
                            </div>
                            <Button variant="outline" className="w-full h-9 text-sm rounded-xl">Manage Lab</Button>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <FlaskConical className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="text-sm font-medium">No lab set up yet.</p>
                            <Button variant="link" className="text-green-400 h-6 font-semibold">Create Lab Profile →</Button>
                        </div>
                    )}

                    <div className="border-t border-border/30 pt-4">
                        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" /> Office Hours
                        </h3>
                        {profile.officeHours ? (
                            <p className="text-sm text-muted-foreground">{profile.officeHours}</p>
                        ) : (
                            <Button variant="outline" className="w-full h-8 text-xs rounded-xl">Set Office Hours</Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
