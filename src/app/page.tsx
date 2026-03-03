"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
        shadow: "shadow-blue-500/20",
        borderFocus: "group-hover:border-blue-500/50",
        icon: GraduationCap,
        description: "Discover events, join research, find teammates, and build your academic portfolio.",
        features: ["Smart event discovery", "Research matching", "Team finder", "Portfolio builder"],
    },
    {
        role: "Organizer",
        color: "organizer",
        gradient: "from-purple-600 to-pink-500",
        shadow: "shadow-purple-500/20",
        borderFocus: "group-hover:border-purple-500/50",
        icon: Building2,
        description: "Create events, recruit members, and grow your club with powerful analytics.",
        features: ["Template-based events", "Recruitment pipeline", "Growth analytics", "Club management"],
    },
    {
        role: "Faculty",
        color: "faculty",
        gradient: "from-green-600 to-teal-500",
        shadow: "shadow-green-500/20",
        borderFocus: "group-hover:border-green-500/50",
        icon: FlaskConical,
        description: "Post research opportunities, manage your lab, and connect with top students.",
        features: ["Opportunity templates", "Application pipeline", "Match scoring", "Lab management"],
    },
    {
        role: "Admin",
        color: "admin",
        gradient: "from-orange-500 to-yellow-400",
        shadow: "shadow-orange-500/20",
        borderFocus: "group-hover:border-orange-500/50",
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

// Reusable animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollY } = useScroll();
    const navBackground = useTransform(
        scrollY,
        [0, 50],
        ["rgba(2, 6, 23, 0)", "rgba(2, 6, 23, 0.8)"] // slate-950 with opacity
    );
    const navBorder = useTransform(
        scrollY,
        [0, 50],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
    );
    const navBackdropBlur = useTransform(
        scrollY,
        [0, 50],
        ["blur(0px)", "blur(12px)"]
    );

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 font-sans">
            {/* Background elements */}
            <div className="fixed inset-0 min-h-screen z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(37,99,235,0.15)_0%,_transparent_50%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,_rgba(147,51,234,0.15)_0%,_transparent_50%)]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Navigation */}
            <motion.nav
                style={{
                    backgroundColor: navBackground,
                    borderBottomColor: navBorder,
                    borderBottomWidth: "1px",
                    backdropFilter: navBackdropBlur,
                    WebkitBackdropFilter: navBackdropBlur,
                }}
                className="fixed top-0 w-full z-50 px-6 py-4 transition-all"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-display font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Campus Nexus
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70"
                    >
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#roles" className="hover:text-white transition-colors">For You</a>
                        <a href="#stats" className="hover:text-white transition-colors">Platform</a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <Link href="/auth/signin" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-4 py-2">
                            Sign In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="text-sm inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-black/20"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </div>
            </motion.nav>

            <main className="relative z-10 w-full">
                {/* Hero Section */}
                <section className="relative pt-40 pb-20 px-6 text-center min-h-[90vh] flex flex-col justify-center items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto flex flex-col items-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-sm mb-8 shadow-xl">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-white/80 font-medium tracking-wide">Your campus, connected</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.1] tracking-tight text-balance">
                            Where Campus <br className="hidden md:block" />
                            <span className="pt-2 pb-2 inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                                Connections
                            </span><br className="hidden md:block" />
                            Come Alive
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
                            Discover events, research opportunities, and teammates. Build your academic network
                            within a verified, closed college ecosystem designed for students, faculty, and organizers.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Link
                                href="/auth/signup"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Join Campus Nexus
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="/auth/signin"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 active:scale-95"
                            >
                                Sign In
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Stats Section */}
                <section id="stats" className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                    >
                        {stats.map(({ label, value, icon: Icon }) => (
                            <motion.div key={label} variants={fadeInUp} className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1">
                                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight">{value}</div>
                                <div className="text-sm font-medium text-white/50">{label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Role Cards Section */}
                <section id="roles" className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                                Built for Everyone on Campus
                            </h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
                                Every role has a tailored experience designed for their unique workflow and academic journey.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {roles.map(({ role, gradient, shadow, borderFocus, icon: Icon, description, features }) => (
                                <motion.div
                                    key={role}
                                    variants={fadeInUp}
                                    className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${borderFocus}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-6 group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] ${shadow} transition-shadow duration-500`}>
                                        <div className="w-full h-full bg-slate-950/50 backdrop-blur-md rounded-[14px] flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-display font-bold mb-3 tracking-tight">{role}</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed line-clamp-3">{description}</p>

                                    <ul className="space-y-3 pt-4 border-t border-white/10">
                                        {features.map((f) => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-white/70 font-medium">
                                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradient} shrink-0`} />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                                Everything You Need, Nothing You Don&apos;t
                            </h2>
                            <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
                                A powerful suite of tools designed interoperably to bring the campus experience online.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {features.map(({ icon: Icon, title, description }) => (
                                <motion.div key={title} variants={fadeInUp} className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.06] transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="font-display font-bold text-xl mb-3">{title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed font-medium">{description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="relative max-w-3xl mx-auto z-10"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                            Ready to Connect Your Campus?
                        </h2>
                        <p className="text-white/60 text-xl mx-auto mb-10 max-w-2xl text-balance">
                            Join thousands of students, faculty, and organizers already on Campus Nexus.
                        </p>
                        <Link
                            href="/auth/signup"
                            className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-blue-50 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] active:scale-95 group"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </section>

            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-xl py-10 px-6 text-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white/50">
                        <Zap className="w-4 h-4" />
                        <span className="font-display font-semibold">Campus Nexus</span>
                    </div>
                    <p className="text-white/40 text-sm font-medium">© 2024 Campus Nexus. All rights reserved.</p>
                    <div className="flex gap-6 text-sm font-medium text-white/40">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
