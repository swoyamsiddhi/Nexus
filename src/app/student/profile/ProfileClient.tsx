"use client";

import { useState } from "react";
import { User as UserIcon, BookOpen, Clock, MapPin, Building2, Zap, Edit2, Camera, Plus, Award, Github, Linkedin, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, parseJsonArray, getInitials, generateAvatarColor } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface StudentProfile {
    id: string; rollNumber?: string | null; branch?: string | null;
    year?: number | null; isHosteler: boolean; bio?: string | null;
    skills?: string; interests?: string; availabilityStatus: string;
    githubUrl?: string | null; linkedinUrl?: string | null; portfolioUrl?: string | null;
    cgpa?: number | null; resumeUrl?: string | null;
    user: { name?: string | null; email?: string | null; image?: string | null; createdAt: Date };
}

const AVAILABILITY_OPTIONS = [
    { value: "OPEN", label: "Open to Collaborate", description: "Available for projects, teams & research", color: "green" },
    { value: "LOOKING_FOR_TEAM", label: "Looking for Team", description: "Actively seeking teammates for a project", color: "blue" },
    { value: "BUSY", label: "Busy / Limited", description: "Limited availability, selective about commitments", color: "orange" },
];

export default function ProfileClient({ profile }: { profile: StudentProfile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentAvailability, setCurrentAvailability] = useState(profile.availabilityStatus);
    const [savingAvailability, setSavingAvailability] = useState(false);
    const { toast } = useToast();

    const skills = parseJsonArray(profile.skills);
    const interests = parseJsonArray(profile.interests);
    const joinedDate = new Date(profile.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const handleAvailabilityChange = async (value: string) => {
        setCurrentAvailability(value);
        setSavingAvailability(true);
        try {
            const res = await fetch("/api/profile/availability", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ availabilityStatus: value }),
            });
            if (!res.ok) throw new Error("Failed to update");
            toast({ title: "Availability updated" });
        } catch {
            toast({ variant: "destructive", title: "Failed to update availability" });
            setCurrentAvailability(profile.availabilityStatus); // revert
        } finally {
            setSavingAvailability(false);
        }
    };

    const availabilityConfig = AVAILABILITY_OPTIONS.find(a => a.value === currentAvailability);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20">

            {/* Cover & Avatar Header */}
            <div className="relative rounded-2xl overflow-hidden bg-card border shadow-sm">
                <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/10" />
                    {isEditing && (
                        <button className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-lg px-3 py-1.5 text-xs font-medium backdrop-blur-md flex items-center gap-1.5 transition-colors">
                            <Camera className="w-3.5 h-3.5" /> Change Cover
                        </button>
                    )}
                </div>

                <div className="px-6 pb-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end -mt-12 sm:-mt-16 mb-4 relative z-10">
                        <div className="relative inline-block w-24 h-24 sm:w-32 sm:h-32 shadow-xl rounded-full border-4 border-card bg-card overflow-hidden">
                            {profile.user.image ? (
                                <img src={profile.user.image} className="w-full h-full object-cover" alt="" />
                            ) : (
                                <div className={`w-full h-full ${generateAvatarColor(profile.user.name || "")} flex items-center justify-center text-white text-3xl font-bold`}>
                                    {getInitials(profile.user.name || "?")}
                                </div>
                            )}
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                                        {profile.user.name}
                                    </h1>
                                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                        <span className="truncate">{profile.branch}</span>
                                        <span className="text-border">•</span>
                                        <span>Year {profile.year}</span>
                                        {profile.rollNumber && (
                                            <>
                                                <span className="text-border">•</span>
                                                <span className="uppercase text-xs font-medium tracking-wider">{profile.rollNumber}</span>
                                            </>
                                        )}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                            <Button onClick={() => setIsEditing(false)}>Save Profile</Button>
                                        </>
                                    ) : (
                                        <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                                            <Edit2 className="w-4 h-4" /> Edit Profile
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className={`px-2.5 py-1 ${currentAvailability === "OPEN" ? "bg-green-500/10 text-green-600 border-green-200" :
                            currentAvailability === "LOOKING_FOR_TEAM" ? "bg-blue-500/10 text-blue-600 border-blue-200" :
                                "bg-orange-500/10 text-orange-600 border-orange-200"
                            }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                            {availabilityConfig?.label || currentAvailability.replace(/_/g, " ")}
                        </Badge>
                        {profile.isHosteler && (
                            <Badge variant="secondary" className="px-2.5 py-1 flex items-center gap-1.5 font-normal">
                                <Building2 className="w-3.5 h-3.5" /> Hosteler
                            </Badge>
                        )}
                        <Badge variant="secondary" className="px-2.5 py-1 flex items-center gap-1.5 font-normal">
                            <Clock className="w-3.5 h-3.5" /> Joined {joinedDate}
                        </Badge>
                    </div>

                    <p className="text-foreground text-sm max-w-3xl leading-relaxed whitespace-pre-wrap">
                        {profile.bio || "No bio provided."}
                    </p>

                    <div className="flex gap-3 mt-6">
                        {profile.githubUrl && (
                            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center text-foreground transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {profile.linkedinUrl && (
                            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center text-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                        {profile.portfolioUrl && (
                            <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center text-foreground transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                        {isEditing && (
                            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full border-dashed">
                                <Plus className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {/* Left Column: Skills, Interests, Academics */}
                <div className="md:col-span-1 space-y-6">
                    <div className="nexus-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-display font-semibold flex items-center gap-2">
                                <Zap className="w-4 h-4 text-blue-500" /> Skills
                            </h2>
                            {isEditing && <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Edit</Button>}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                                    {skill}
                                </Badge>
                            ))}
                            {isEditing && (
                                <Badge variant="outline" className="border-dashed cursor-pointer font-normal hover:bg-accent">
                                    <Plus className="w-3 h-3 mr-1" /> Add
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="nexus-card p-5">
                        <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-purple-500" /> Interests
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                            {interests.map(interest => (
                                <Badge key={interest} variant="outline" className="font-medium text-muted-foreground">
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="nexus-card p-5">
                        <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
                            <BookOpen className="w-4 h-4 text-orange-500" /> Academics
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">CGPA</p>
                                <div className="flex items-end gap-2 text-2xl font-display font-bold">
                                    {profile.cgpa ? profile.cgpa.toFixed(2) : "--"} <span className="text-sm text-muted-foreground font-normal mb-1">/ 10.0</span>
                                </div>
                                {profile.cgpa && <Progress value={(profile.cgpa / 10) * 100} className="h-1.5 mt-2" />}
                            </div>
                            {profile.resumeUrl && (
                                <div className="pt-2">
                                    <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                                        <Button variant="outline" className="w-full text-sm">View Resume</Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Availability Settings Card */}
                    <div className="nexus-card p-5">
                        <h2 className="font-display font-semibold flex items-center gap-2 mb-1">
                            <UserIcon className="w-4 h-4 text-green-500" /> Availability
                        </h2>
                        <p className="text-xs text-muted-foreground mb-4">Let others know how open you are to collaborating</p>
                        <div className="space-y-2">
                            {AVAILABILITY_OPTIONS.map(({ value, label, description, color }) => (
                                <button
                                    key={value}
                                    onClick={() => handleAvailabilityChange(value)}
                                    disabled={savingAvailability}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-sm",
                                        currentAvailability === value
                                            ? color === "green"
                                                ? "border-green-500/40 bg-green-500/8 ring-1 ring-green-500/20"
                                                : color === "blue"
                                                    ? "border-blue-500/40 bg-blue-500/8 ring-1 ring-blue-500/20"
                                                    : "border-orange-500/40 bg-orange-500/8 ring-1 ring-orange-500/20"
                                            : "border-border bg-transparent hover:bg-accent/50"
                                    )}
                                >
                                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color === "green" ? "bg-green-500" : color === "blue" ? "bg-blue-500" : "bg-orange-500"}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-foreground">{label}</div>
                                        <div className="text-xs text-muted-foreground">{description}</div>
                                    </div>
                                    {currentAvailability === value && (
                                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${color === "green" ? "text-green-500" : color === "blue" ? "text-blue-500" : "text-orange-500"}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Portfolio & Experience */}
                <div className="md:col-span-2 space-y-6">
                    <div className="nexus-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-500" /> Achievements & Projects
                            </h2>
                            <Button size="sm" variant="outline" className="h-8 gap-1.5">
                                <Plus className="w-3.5 h-3.5" /> Add New
                            </Button>
                        </div>

                        <div className="text-center py-12 text-muted-foreground bg-accent/50 rounded-xl border border-dashed border-border">
                            <Award className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="text-sm font-medium">No projects added yet</p>
                            <p className="text-xs mt-1">Showcase your hackathons, research, and personal builds here.</p>
                            <Button size="sm" className="mt-4">Add Project</Button>
                        </div>
                    </div>

                    <div className="nexus-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-display font-semibold">Campus Activity</h2>
                        </div>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                            <div className="text-center py-8 text-muted-foreground z-10 relative">
                                <p className="text-sm">Activity history will appear here as you join clubs and events.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
