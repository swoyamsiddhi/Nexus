"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2, Users, Calendar, TrendingUp, Plus, ArrowRight,
    BarChart3, Settings, Users2, Mail, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatEventDate, generateAvatarColor, getInitials } from "@/lib/utils";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

export default function OrganizerHomeClient({ club, userName }: any) {
    const firstName = userName?.split(" ")[0] || "Organizer";

    if (!club) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-500/10">
                        <Building2 className="w-10 h-10 text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-display font-bold mb-3">Pending Admin Approval</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                        Your organizer account is under review by the campus administration. Once approved, you&apos;ll be able to create and manage your club.
                    </p>
                    <Button variant="outline" onClick={() => window.location.reload()} className="rounded-xl">
                        Refresh Status
                    </Button>
                </motion.div>
            </div>
        );
    }

    const statItems = [
        { label: "Total Members", value: club._count.members, icon: Users2, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/10" },
        { label: "Events Hosted", value: club._count.events, icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/10" },
        { label: "Active Registrations", value: club.events.reduce((a: any, b: any) => a + b._count.registrations, 0), icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/10" },
        { label: "Recruitment Applications", value: 12, icon: Mail, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/10" },
    ];

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
                    {club.logo ? (
                        <img src={club.logo} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-border/50" alt={club.name} />
                    ) : (
                        <div className={`w-16 h-16 rounded-2xl ${generateAvatarColor(club.name)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                            {getInitials(club.name)}
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
                            {club.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/20 rounded-lg font-semibold">
                                {club.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground font-medium">Welcome back, {firstName}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2.5">
                    <Button variant="outline" size="sm" className="gap-2 rounded-xl border-border/50 hover:bg-accent/50">
                        <Settings className="w-4 h-4" /> Settings
                    </Button>
                    <Link href="/organizer/events/create">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2 shadow-lg shadow-purple-500/15 rounded-xl font-semibold">
                            <Plus className="w-4 h-4" /> Create Event
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statItems.map(({ label, value, icon: Icon, color, bg, border }) => (
                    <motion.div key={label} variants={fadeInUp} className={`group bg-card border ${border} rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}>
                        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                            <div className="text-3xl font-display font-bold text-foreground tracking-tight">{value}</div>
                            <div className="text-xs text-muted-foreground font-medium mt-0.5">{label}</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column: Events */}
                <motion.div variants={fadeInUp} className="lg:col-span-2 bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-purple-400" />
                            </div>
                            Active Events
                        </h2>
                        <Link href="/organizer/events" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                            Manage all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {club.events.length === 0 ? (
                        <div className="text-center py-14 text-muted-foreground bg-accent/30 rounded-xl border border-dashed border-border/50 text-sm">
                            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="font-medium">No active events right now.</p>
                            <Link href="/organizer/events/create">
                                <Button variant="link" className="h-6 mt-2 text-purple-400 font-semibold">Create one →</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {club.events.map((event: any, i: number) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex items-center justify-between p-4 border border-border/40 rounded-xl hover:bg-accent/40 hover:border-border transition-all duration-200"
                                >
                                    <div>
                                        <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">{event.title}</h3>
                                        <p className="text-xs text-muted-foreground flex gap-3 items-center">
                                            <span>{formatEventDate(event.startTime)}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                            <span className="text-purple-400 font-semibold">{event._count.registrations} Registrations</span>
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm" className="rounded-lg text-xs font-medium gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        Manage <ChevronRight className="w-3 h-3" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Recruitment */}
                    <motion.div variants={fadeInUp} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-display font-semibold flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-blue-400" />
                                </div>
                                Recruitment
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-2">
                                    <span className="text-muted-foreground">Applications received</span>
                                    <span className="text-blue-400">12 / 50 cap</span>
                                </div>
                                <div className="relative h-2 bg-blue-500/10 rounded-full overflow-hidden">
                                    <Progress value={24} className="h-2 bg-blue-500/10" />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Your club is currently accepting applications for Technical Team and Marketing.
                            </p>
                            <Link href="/organizer/recruit" className="block w-full">
                                <Button variant="outline" className="w-full text-blue-400 border-blue-500/20 hover:bg-blue-500/5 hover:border-blue-500/30 rounded-xl font-semibold transition-all">
                                    Open Recruitment Dashboard
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Weekly Overview */}
                    <motion.div variants={fadeInUp} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-emerald-400" />
                            </div>
                            Weekly Overview
                        </h2>
                        <div className="space-y-4">
                            {[
                                { label: "Profile Views", value: "+24%", color: "text-emerald-400" },
                                { label: "New Members", value: "+3", color: "text-foreground" },
                                { label: "Event Engagement", value: "High", color: "text-foreground" },
                            ].map(({ label, value, color }, i) => (
                                <div key={label} className={`flex justify-between items-center text-sm ${i < 2 ? "border-b border-border/30 pb-3" : ""}`}>
                                    <span className="text-muted-foreground font-medium">{label}</span>
                                    <span className={`font-bold ${color}`}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
