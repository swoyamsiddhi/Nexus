"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, BookOpen, Users, DollarSign, MapPin, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const OPPORTUNITY_TYPES = ["INTERNSHIP", "SEMESTER_PROJECT", "THESIS", "RESEARCH_ASSISTANT", "READING_GROUP"];

export default function FacultyPublishPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "", description: "", type: "INTERNSHIP", duration: "",
        timeCommitmentHours: "", compensationType: "UNPAID", locationType: "IN_PERSON",
        skillsRequired: "", branchPreference: "", yearPreference: "", minCgpa: "",
    });

    const handleChange = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/research", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    skillsRequired: form.skillsRequired.split(",").map(s => s.trim()).filter(Boolean),
                    branchPreference: form.branchPreference.split(",").map(s => s.trim()).filter(Boolean),
                    yearPreference: form.yearPreference.split(",").map(s => s.trim()).filter(Boolean),
                    timeCommitmentHours: form.timeCommitmentHours ? parseInt(form.timeCommitmentHours) : undefined,
                    minCgpa: form.minCgpa ? parseFloat(form.minCgpa) : undefined,
                }),
            });
            if (!res.ok) throw new Error("Failed to publish");
            toast({ title: "Research opportunity published! 🎓" });
            router.push("/faculty");
        } catch {
            toast({ variant: "destructive", title: "Failed to publish. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20">
            <div className="flex items-center gap-3 text-muted-foreground">
                <Link href="/faculty" className="hover:text-foreground transition-colors flex items-center text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Lab Home
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-display font-bold">Post Research Opportunity</h1>
                <p className="text-muted-foreground mt-2">Attract the right students for your lab or project.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="nexus-card p-6 md:p-8 space-y-6">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2 border-b pb-4">
                        <BookOpen className="w-5 h-5 text-green-600" /> Opportunity Details
                    </h2>
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label>Title <span className="text-red-500">*</span></Label>
                            <Input
                                placeholder="e.g. NLP Research on Code-Mixed Text"
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                className="h-11"
                                required
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <select
                                    className="w-full h-11 border border-input bg-transparent rounded-xl px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                    value={form.type}
                                    onChange={(e) => handleChange("type", e.target.value)}
                                >
                                    {OPPORTUNITY_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Compensation</Label>
                                <select
                                    className="w-full h-11 border border-input bg-transparent rounded-xl px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                    value={form.compensationType}
                                    onChange={(e) => handleChange("compensationType", e.target.value)}
                                >
                                    <option value="UNPAID">Unpaid (Volunteer)</option>
                                    <option value="STIPEND">Stipend</option>
                                    <option value="PAID">Paid Internship</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description <span className="text-red-500">*</span></Label>
                            <textarea
                                className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px]"
                                placeholder="Describe the research topic, work involved, expected outcomes, and what students will learn..."
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground" /> Duration</Label>
                                <Input
                                    placeholder="e.g. 3 months / 1 semester"
                                    value={form.duration}
                                    onChange={(e) => handleChange("duration", e.target.value)}
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground" /> Hours/Week</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 15"
                                    value={form.timeCommitmentHours}
                                    onChange={(e) => handleChange("timeCommitmentHours", e.target.value)}
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Location Type</Label>
                            <div className="flex gap-3">
                                {["IN_PERSON", "REMOTE", "HYBRID"].map(l => (
                                    <label key={l} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="locationType"
                                            value={l}
                                            checked={form.locationType === l}
                                            onChange={() => handleChange("locationType", l)}
                                            className="accent-green-600"
                                        />
                                        <span className="text-sm">{l.replace("_", " ")}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Requirements */}
                <div className="nexus-card p-6 md:p-8 space-y-6">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2 border-b pb-4">
                        <Users className="w-5 h-5 text-blue-600" /> Student Requirements
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-muted-foreground" /> Required Skills</Label>
                            <Input
                                placeholder="Python, ML, TensorFlow (comma separated)"
                                value={form.skillsRequired}
                                onChange={(e) => handleChange("skillsRequired", e.target.value)}
                                className="h-11"
                            />
                            <p className="text-[10px] text-muted-foreground">Used for AI match scoring</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Branch Preference</Label>
                            <Input
                                placeholder="CSE, ECE (empty = all branches)"
                                value={form.branchPreference}
                                onChange={(e) => handleChange("branchPreference", e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Year Preference</Label>
                            <Input
                                placeholder="2, 3, 4 (empty = all years)"
                                value={form.yearPreference}
                                onChange={(e) => handleChange("yearPreference", e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-muted-foreground" /> Minimum CGPA</Label>
                            <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                placeholder="e.g. 8.0 (leave empty for no minimum)"
                                value={form.minCgpa}
                                onChange={(e) => handleChange("minCgpa", e.target.value)}
                                className="h-11"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-end border-t pt-6">
                    <Button type="button" variant="outline" className="h-11 px-6" onClick={() => router.back()}>Cancel</Button>
                    <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white h-11 px-8 shadow-md"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Opportunity"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
