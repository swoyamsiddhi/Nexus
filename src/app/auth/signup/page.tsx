"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, Loader2, GraduationCap, FlaskConical, Building2 } from "lucide-react";
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
        ring: "ring-blue-500",
    },
    {
        value: "FACULTY",
        label: "Faculty",
        icon: FlaskConical,
        description: "Post research opportunities and manage your lab",
        color: "from-green-500 to-teal-500",
        ring: "ring-green-500",
    },
    {
        value: "ORGANIZER",
        label: "Organizer",
        icon: Building2,
        description: "Create events and grow your club",
        color: "from-purple-500 to-pink-500",
        ring: "ring-purple-500",
    },
];

export default function SignUpPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState<1 | 2>(1);
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
            // Auto sign-in
            const { signIn } = await import("next-auth/react");
            await signIn("credentials", { email, password, redirect: false });
            router.push("/onboarding");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md space-y-6">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-display font-bold text-white">Campus Nexus</span>
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Create your account</h1>
                    <p className="text-white/50">
                        {step === 1 ? "Choose your role on campus" : "Enter your account details"}
                    </p>
                </div>

                {/* Progress */}
                <div className="flex gap-2">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-blue-500" : "bg-white/20"} transition-colors`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-white/20"} transition-colors`} />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                    {step === 1 ? (
                        <div className="space-y-3">
                            {roles.map(({ value, label, icon: Icon, description, color, ring }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setSelectedRole(value)}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
                                        selectedRole === value
                                            ? `border-transparent ring-2 ${ring} bg-white/10`
                                            : "border-white/10 bg-white/5 hover:bg-white/8"
                                    )}
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{label}</div>
                                        <div className="text-sm text-white/50">{description}</div>
                                    </div>
                                    {selectedRole === value && (
                                        <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                            {(selectedRole === "FACULTY" || selectedRole === "ORGANIZER") && (
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-300 text-xs text-center">
                                    ⚠️ {selectedRole === "FACULTY" ? "Faculty" : "Organizer"} accounts require admin verification before full access.
                                </div>
                            )}
                            <Button
                                className="w-full h-12 mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg"
                                onClick={() => setStep(2)}
                            >
                                Continue as {roles.find(r => r.value === selectedRole)?.label}
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white/80">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/80">College Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@college.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white/80">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-blue-500 pr-10"
                                        minLength={8}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 border-white/20 text-white/70 bg-transparent hover:bg-white/5"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>

                <p className="text-center text-white/50 text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
