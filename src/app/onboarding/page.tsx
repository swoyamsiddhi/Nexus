"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Zap, User, BookOpen, Heart,
    CheckCircle2, Loader2, ChevronRight, Plus, X
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

export default function OnboardingPage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const role = session?.user?.role || "STUDENT";

    const [step, setStep] = useState(0);
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
            if (!res.ok) throw new Error("Failed to save onboarding");
            await update({ onboardingStatus: "COMPLETE" });
            toast({ title: "Welcome to Campus Nexus! 🎉" });
            const roleMap: Record<string, string> = { STUDENT: "/student", FACULTY: "/faculty", ORGANIZER: "/organizer", ADMIN: "/admin" };
            router.push(roleMap[role] || "/student");
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-display font-bold text-white">Campus Nexus</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Set up your profile</h1>
                    <p className="text-white/50">This helps us match you with the right opportunities</p>
                </div>

                {/* Step indicators */}
                <div className="flex items-center justify-center gap-0 mb-8">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex items-center">
                            <div className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300",
                                i < step ? "border-blue-500 bg-blue-500 text-white" :
                                    i === step ? "border-blue-500 bg-transparent text-blue-400" :
                                        "border-white/20 bg-transparent text-white/30"
                            )}>
                                {i < step ? <CheckCircle2 className="w-4 h-4" /> : (
                                    <span className="text-xs font-bold">{i + 1}</span>
                                )}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={cn("w-16 h-0.5 mx-1", i < step ? "bg-blue-500" : "bg-white/15")} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        {(() => { const S = STEPS[step]; return <S.icon className="w-6 h-6 text-blue-400" />; })()}
                        <div>
                            <h2 className="text-xl font-display font-bold text-white">{STEPS[step].title}</h2>
                            <p className="text-sm text-white/50">{STEPS[step].description}</p>
                        </div>
                    </div>

                    {/* Step 0: Basic Info */}
                    {step === 0 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-white/80">Academic Year</Label>
                                    <select
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full h-11 rounded-xl border border-white/20 bg-white/5 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" className="bg-slate-900">Select year</option>
                                        {YEAR_OPTIONS.map((y, i) => (
                                            <option key={y} value={i + 1} className="bg-slate-900">{y}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/80">Branch / Major</Label>
                                    <select
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        className="w-full h-11 rounded-xl border border-white/20 bg-white/5 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <Label className="text-white/80">Roll Number</Label>
                                    <Input
                                        placeholder="e.g. 21CS1001"
                                        value={rollNumber}
                                        onChange={(e) => setRollNumber(e.target.value)}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label className="text-white/80">Bio <span className="text-white/30">(optional)</span></Label>
                                <textarea
                                    placeholder="Tell us about yourself in 2-3 sentences..."
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                            {role === "STUDENT" && (
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div
                                        onClick={() => setIsHosteler(!isHosteler)}
                                        className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                            isHosteler ? "bg-blue-500 border-blue-500" : "border-white/30 bg-transparent"
                                        )}
                                    >
                                        {isHosteler && <CheckCircle2 className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className="text-white/70 text-sm">I live in the hostel</span>
                                </label>
                            )}
                        </div>
                    )}

                    {/* Step 1: Skills */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Type a skill and press Enter..."
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    onClick={() => addSkill(skillInput)}
                                    className="bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-400"
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <Badge key={skill} className="bg-blue-500/20 text-blue-300 border-blue-500/30 pr-1 flex items-center gap-1">
                                            {skill}
                                            <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-white">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-white/40 mb-2">Suggestions:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => addSkill(s)}
                                            className="text-xs border border-white/15 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-full px-3 py-1 transition-colors"
                                        >
                                            + {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Interests */}
                    {step === 2 && (
                        <div className="flex flex-wrap gap-2">
                            {INTEREST_OPTIONS.map((interest) => (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-150",
                                        interests.includes(interest)
                                            ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                                            : "bg-white/5 border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    {interests.includes(interest) && "✓ "}{interest}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={() => setStep(s => (s - 1) as typeof step)}
                            disabled={step === 0}
                            className="border-white/20 text-white/60 bg-transparent hover:bg-white/5"
                        >
                            Back
                        </Button>
                        {step < STEPS.length - 1 ? (
                            <Button
                                onClick={() => setStep(s => (s + 1) as typeof step)}
                                disabled={!canProceed()}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-2"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleComplete}
                                disabled={loading || !canProceed()}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Complete Setup 🎉"}
                            </Button>
                        )}
                    </div>
                </div>

                <p className="text-center text-white/30 text-xs mt-4">
                    Step {step + 1} of {STEPS.length} · You can update this anytime from your profile
                </p>
            </div>
        </div>
    );
}
