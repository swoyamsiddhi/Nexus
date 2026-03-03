"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Eye, EyeOff, Loader2, GraduationCap, FlaskConical, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const roles = [
    {
        value: "STUDENT",
        label: "Student",
        icon: GraduationCap,
        description: "Discover events, research, and teammates",
        color: "from-blue-500 to-cyan-500",
        ring: "ring-blue-500/50",
        shadow: "shadow-blue-500/20",
    },
    {
        value: "FACULTY",
        label: "Faculty",
        icon: FlaskConical,
        description: "Post research opportunities and manage your lab",
        color: "from-green-500 to-teal-500",
        ring: "ring-green-500/50",
        shadow: "shadow-green-500/20",
    },
    {
        value: "ORGANIZER",
        label: "Organizer",
        icon: Building2,
        description: "Create events and grow your club",
        color: "from-purple-500 to-pink-500",
        ring: "ring-purple-500/50",
        shadow: "shadow-purple-500/20",
    },
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 60 : -60,
        opacity: 0,
    }),
};

export default function SignUpPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState<1 | 2>(1);
    const [direction, setDirection] = useState(0);
    const [selectedRole, setSelectedRole] = useState("STUDENT");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role: selectedRole }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast({ variant: "destructive", title: "Registration failed", description: data.error || "Please try again." });
                return;
            }
            toast({ variant: "success" as never, title: "Account created! 🎉", description: "Redirecting to onboarding..." });
            const { signIn } = await import("next-auth/react");
            await signIn("credentials", { email, password, redirect: false });
            router.push("/onboarding");
        } finally {
            setLoading(false);
        }
    };

    const goToStep2 = () => { setDirection(1); setStep(2); };
    const goToStep1 = () => { setDirection(-1); setStep(1); };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
            {/* Animated background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(37,99,235,0.12)_0%,_transparent_50%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(147,51,234,0.12)_0%,_transparent_50%)]" />
                <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] animate-blob mix-blend-screen" />
                <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md space-y-6"
            >
                <div className="text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold text-white">Campus Nexus</span>
                        </Link>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight">
                        Create your account
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/50 font-medium">
                        {step === 1 ? "Choose your role on campus" : "Enter your account details"}
                    </motion.p>
                </div>

                {/* Progress */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2">
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-white/10"}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-gradient-to-r from-blue-600 to-purple-500" : "bg-white/10"}`} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20"
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        {step === 1 ? (
                            <motion.div
                                key="step-1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-3"
                            >
                                {roles.map(({ value, label, icon: Icon, description, color, ring, shadow }) => (
                                    <motion.button
                                        key={value}
                                        type="button"
                                        onClick={() => setSelectedRole(value)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left",
                                            selectedRole === value
                                                ? `border-transparent ring-2 ${ring} bg-white/[0.06]`
                                                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                                        )}
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-0.5 flex-shrink-0 ${selectedRole === value ? `shadow-lg ${shadow}` : ""}`}>
                                            <div className="w-full h-full bg-slate-950/40 rounded-[10px] flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-white">{label}</div>
                                            <div className="text-sm text-white/50">{description}</div>
                                        </div>
                                        {selectedRole === value && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                                {(selectedRole === "FACULTY" || selectedRole === "ORGANIZER") && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-300 text-xs text-center font-medium"
                                    >
                                        ⚠️ {selectedRole === "FACULTY" ? "Faculty" : "Organizer"} accounts require admin verification before full access.
                                    </motion.div>
                                )}
                                <Button
                                    className="w-full h-12 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.5)] transition-shadow"
                                    onClick={goToStep2}
                                >
                                    Continue as {roles.find(r => r.value === selectedRole)?.label}
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="step-2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white/80 font-medium text-sm">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-white/25 focus-visible:ring-blue-500/50 rounded-xl"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white/80 font-medium text-sm">College Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@college.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-white/25 focus-visible:ring-blue-500/50 rounded-xl"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-white/80 font-medium text-sm">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Min 8 characters"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-white/25 focus-visible:ring-blue-500/50 pr-10 rounded-xl"
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 h-12 border-white/15 text-white/60 bg-transparent hover:bg-white/[0.05] hover:text-white rounded-xl font-medium"
                                        onClick={goToStep1}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.5)] transition-shadow"
                                        disabled={loading}
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                                    </Button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-white/40 text-sm font-medium"
                >
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                        Sign in
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}
