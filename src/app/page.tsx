"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Users, BookOpen, Calendar, Zap, ArrowRight, Star,
    GraduationCap, FlaskConical, Building2, Shield,
    MessageSquare, Search, Award, TrendingUp
} from "lucide-react";

const stats = [
    { label: "Students", value: "12,000+", icon: Users },
    { label: "Events/Month", value: "200+", icon: Calendar },
    { label: "Research Opportunities", value: "80+", icon: BookOpen },
    { label: "Active Clubs", value: "150+", icon: Star },
];

const roles = [
    {
        role: "Student",
        color: "student",
        gradient: "from-blue-600 to-cyan-500",
        icon: GraduationCap,
        description: "Discover events, join research, find teammates, and build your academic portfolio.",
        features: ["Smart event discovery", "Research matching", "Team finder", "Portfolio builder"],
    },
    {
        role: "Organizer",
        color: "organizer",
        gradient: "from-purple-600 to-pink-500",
        icon: Building2,
        description: "Create events, recruit members, and grow your club with powerful analytics.",
        features: ["Template-based events", "Recruitment pipeline", "Growth analytics", "Club management"],
    },
    {
        role: "Faculty",
        color: "faculty",
        gradient: "from-green-600 to-teal-500",
        icon: FlaskConical,
        description: "Post research opportunities, manage your lab, and connect with top students.",
        features: ["Opportunity templates", "Application pipeline", "Match scoring", "Lab management"],
    },
    {
        role: "Admin",
        color: "admin",
        gradient: "from-orange-500 to-yellow-400",
        icon: Shield,
        description: "Full platform control with moderation, analytics, and user management.",
        features: ["User verification", "Content moderation", "Platform analytics", "Settings control"],
    },
];

const features = [
    {
        icon: Zap,
        title: "Smart Matching",
        description: "AI-powered match scores connect you with research opportunities and teammates based on your skills.",
    },
    {
        icon: MessageSquare,
        title: "Real-Time Messaging",
        description: "Chat with individuals, teams, and clubs. Get instant notifications for what matters.",
    },
    {
        icon: Search,
        title: "Unified Discovery",
        description: "Find events, clubs, research, and collaborators all in one place with powerful filters.",
    },
    {
        icon: Award,
        title: "Portfolio Builder",
        description: "Auto-log your achievements — events, research, hackathons — into a shareable portfolio.",
    },
    {
        icon: TrendingUp,
        title: "Analytics & Insights",
        description: "Organizers get attendance predictions; faculty get application insights; students track growth.",
    },
    {
        icon: Users,
        title: "Closed Ecosystem",
        description: "Verified college-domain emails ensure a safe, trusted campus-only network.",
    },
];

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-dark px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-display font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Campus Nexus
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#roles" className="hover:text-white transition-colors">For You</a>
                        <a href="#stats" className="hover:text-white transition-colors">Platform</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/auth/signin" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2">
                            Sign In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-5 py-2.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 text-center relative">
                {/* Background orbs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className={`relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white/80">Your campus, connected</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                        Where Campus
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Connections
                        </span>
                        <br />
                        Come Alive
                    </h1>
                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover events, research opportunities, and teammates. Build your academic network
                        within a verified, closed college ecosystem designed for students, faculty, and organizers.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/auth/signup"
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 group"
                        >
                            Join Campus Nexus
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/auth/signin"
                            className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/15 px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section id="stats" className="py-16 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                            <Icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                            <div className="text-3xl font-display font-bold text-white mb-1">{value}</div>
                            <div className="text-sm text-white/50">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Role Cards */}
            <section id="roles" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Built for Everyone on Campus
                        </h2>
                        <p className="text-white/55 text-lg max-w-xl mx-auto">
                            Every role has a tailored experience designed for their unique workflow.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {roles.map(({ role, gradient, icon: Icon, description, features }) => (
                            <div
                                key={role}
                                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-display font-bold mb-2">{role}</h3>
                                <p className="text-white/55 text-sm mb-4 leading-relaxed">{description}</p>
                                <ul className="space-y-1.5">
                                    {features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradient}`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Everything You Need, Nothing You Don&apos;t
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
                <div className="relative max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Ready to Connect Your Campus?
                    </h2>
                    <p className="text-white/60 text-lg mb-10">
                        Join thousands of students, faculty, and organizers already on Campus Nexus.
                    </p>
                    <Link
                        href="/auth/signup"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-10 py-5 rounded-2xl font-semibold text-xl transition-all hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 group"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 px-6 text-center text-white/40 text-sm">
                <p>© 2024 Campus Nexus. Built for the college community.</p>
            </footer>
        </div>
    );
}
