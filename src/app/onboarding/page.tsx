"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap, User, BookOpen, Heart,
    CheckCircle2, Loader2, ChevronRight, Plus, X, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STEPS = [
    { title: "Basic Info", icon: User, description: "Tell us about yourself" },
    { title: "Skills", icon: BookOpen, description: "What can you do?" },
    { title: "Interests", icon: Heart, description: "What excites you?" },
];

const INTEREST_OPTIONS = [
    "Technology", "Design", "Research", "Business", "Arts",
    "Social Impact", "Sports", "Music", "Gaming", "Entrepreneurship",
    "AI/ML", "Web Dev", "Mobile Dev", "Data Science", "Sustainability"
];

const SKILL_SUGGESTIONS = [
    "Python", "JavaScript", "React", "Node.js", "Machine Learning",
    "UI/UX Design", "Figma", "Public Speaking", "Leadership", "Research",
    "Java", "C++", "Flutter", "Data Analysis", "Video Editing",
    "Photography", "Content Writing", "Marketing", "Finance", "Statistics"
];

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Postgraduate"];
const BRANCH_OPTIONS = [
    "Computer Science", "Information Technology", "ECE", "EEE", "Mechanical",
    "Civil", "Chemical", "Biotechnology", "Mathematics", "Physics", "MBA", "Other"
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
        filter: "blur(4px)",
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 80 : -80,
        opacity: 0,
        filter: "blur(4px)",
    }),
};

export default function OnboardingPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const role = session?.user?.role || "STUDENT";

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [loading, setLoading] = useState(false);

    // Form state
    const [rollNumber, setRollNumber] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [isHosteler, setIsHosteler] = useState(false);
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [interests, setInterests] = useState<string[]>([]);

    const addSkill = (skill: string) => {
        const trimmed = skill.trim();
        if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
        setSkillInput("");
    };

    const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));
    const toggleInterest = (i: string) => setInterests(
        interests.includes(i) ? interests.filter((x) => x !== i) : [...interests, i]
    );

    const goNext = () => { setDirection(1); setStep(s => s + 1); };
    const goBack = () => { setDirection(-1); setStep(s => s - 1); };

    const handleComplete = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role,
                    data: { rollNumber, branch, year: parseInt(year) || 1, isHosteler, bio, skills, interests },
                }),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to save onboarding");
            }
            toast({ title: "Welcome to Campus Nexus! 🎉" });
            const roleMap: Record<string, string> = { STUDENT: "/student", FACULTY: "/faculty", ORGANIZER: "/organizer", ADMIN: "/admin" };
            window.location.replace(roleMap[role] || "/student");
        } catch {
            toast({ variant: "destructive", title: "Error", description: "Failed to save. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const canProceed = () => {
        if (step === 0) return branch && year;
        if (step === 1) return skills.length > 0;
        if (step === 2) return interests.length > 0;
        return true;
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
            {/* Animated background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(37,99,235,0.12)_0%,_transparent_50%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(147,51,234,0.12)_0%,_transparent_50%)]" />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] animate-blob mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-2xl"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2.5 mb-5"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-display font-bold text-white">Campus Nexus</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight"
                    >
                        Set up your profile
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/50 text-base font-medium"
                    >
                        This helps us match you with the right opportunities
                    </motion.p>
                </div>

                {/* Step indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center justify-center gap-0 mb-10"
                >
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex items-center">
                            <motion.div
                                animate={{
                                    scale: i === step ? 1.1 : 1,
                                    borderColor: i < step ? "rgb(59, 130, 246)" : i === step ? "rgb(59, 130, 246)" : "rgba(255,255,255,0.15)",
                                    backgroundColor: i < step ? "rgb(59, 130, 246)" : "transparent",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                                    i < step ? "text-white" :
                                        i === step ? "text-blue-400" :
                                            "text-white/30"
                                )}
                            >
                                {i < step ? <CheckCircle2 className="w-5 h-5" /> : (
                                    <span className="text-xs font-bold">{i + 1}</span>
                                )}
                            </motion.div>
                            {i < STEPS.length - 1 && (
                                <div className="relative w-20 h-0.5 mx-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: i < step ? "100%" : "0%" }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            {(() => { const S = STEPS[step]; return <S.icon className="w-5 h-5 text-blue-400" />; })()}
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-bold text-white">{STEPS[step].title}</h2>
                            <p className="text-sm text-white/50 font-medium">{STEPS[step].description}</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait" custom={direction}>
                        {/* Step 0: Basic Info */}
                        {step === 0 && (
                            <motion.div
                                key="step-0"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-5"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-white/80 font-medium text-sm">Academic Year</Label>
                                        <select
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className="w-full h-12 rounded-xl border border-white/15 bg-white/[0.04] text-white px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                                        >
                                            <option value="" className="bg-slate-900">Select year</option>
                                            {YEAR_OPTIONS.map((y, i) => (
                                                <option key={y} value={i + 1} className="bg-slate-900">{y}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white/80 font-medium text-sm">Branch / Major</Label>
                                        <select
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                            className="w-full h-12 rounded-xl border border-white/15 bg-white/[0.04] text-white px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                                        >
                                            <option value="" className="bg-slate-900">Select branch</option>
                                            {BRANCH_OPTIONS.map((b) => (
                                                <option key={b} value={b} className="bg-slate-900">{b}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {role === "STUDENT" && (
                                    <div className="space-y-2">
                                        <Label className="text-white/80 font-medium text-sm">Roll Number</Label>
                                        <Input
                                            placeholder="e.g. 21CS1001"
                                            value={rollNumber}
                                            onChange={(e) => setRollNumber(e.target.value)}
                                            className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-white/25 focus-visible:ring-blue-500/50 rounded-xl"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label className="text-white/80 font-medium text-sm">Bio <span className="text-white/25">(optional)</span></Label>
                                    <textarea
                                        placeholder="Tell us about yourself in 2-3 sentences..."
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-white/25 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all"
                                    />
                                </div>
                                {role === "STUDENT" && (
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => setIsHosteler(!isHosteler)}
                                            className={cn(
                                                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                                                isHosteler ? "bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "border-white/25 bg-transparent group-hover:border-white/40"
                                            )}
                                        >
                                            {isHosteler && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-white/70 text-sm font-medium">I live in the hostel</span>
                                    </label>
                                )}
                            </motion.div>
                        )}

                        {/* Step 1: Skills */}
                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-5"
                            >
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type a skill and press Enter..."
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }}
                                        className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-white/25 focus-visible:ring-blue-500/50 rounded-xl"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => addSkill(skillInput)}
                                        className="h-12 bg-blue-500/15 border border-blue-500/25 hover:bg-blue-500/25 text-blue-400 rounded-xl px-4"
                                        variant="outline"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {skills.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {skills.map((skill) => (
                                                <motion.div
                                                    key={skill}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                >
                                                    <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/25 pr-1.5 flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium">
                                                        {skill}
                                                        <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-white transition-colors">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div>
                                    <p className="text-xs text-white/40 mb-3 font-medium flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3" /> Suggestions
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).map((s) => (
                                            <motion.button
                                                key={s}
                                                onClick={() => addSkill(s)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-xs border border-white/10 bg-white/[0.03] text-white/55 hover:text-white hover:bg-white/[0.07] hover:border-white/20 rounded-full px-3.5 py-1.5 transition-all font-medium"
                                            >
                                                + {s}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Interests */}
                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-wrap gap-3"
                            >
                                {INTEREST_OPTIONS.map((interest) => (
                                    <motion.button
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.92 }}
                                        className={cn(
                                            "px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200",
                                            interests.includes(interest)
                                                ? "bg-blue-500/20 border-blue-500/40 text-blue-300 shadow-[0_0_15px_-5px_rgba(59,130,246,0.4)]"
                                                : "bg-white/[0.03] border-white/10 text-white/55 hover:bg-white/[0.07] hover:text-white hover:border-white/20"
                                        )}
                                    >
                                        {interests.includes(interest) && "✓ "}{interest}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
                        <Button
                            variant="outline"
                            onClick={goBack}
                            disabled={step === 0}
                            className="border-white/15 text-white/60 bg-transparent hover:bg-white/[0.05] hover:text-white rounded-xl h-12 px-6 font-medium disabled:opacity-30"
                        >
                            Back
                        </Button>
                        {step < STEPS.length - 1 ? (
                            <motion.div
                                animate={canProceed() ? { scale: [1, 1.03, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <Button
                                    onClick={goNext}
                                    disabled={!canProceed()}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 rounded-xl h-12 px-6 font-semibold hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.5)] transition-shadow disabled:opacity-40"
                                >
                                    Continue <ChevronRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        ) : (
                            <Button
                                onClick={handleComplete}
                                disabled={loading || !canProceed()}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl h-12 px-6 font-semibold hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.5)] transition-shadow disabled:opacity-40"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Complete Setup 🎉"}
                            </Button>
                        )}
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-white/25 text-xs mt-6 font-medium"
                >
                    Step {step + 1} of {STEPS.length} · You can update this anytime from your profile
                </motion.p>
            </motion.div>
        </div>
    );
}
