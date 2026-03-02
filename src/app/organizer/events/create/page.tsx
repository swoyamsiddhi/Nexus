"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Calendar, MapPin, AlignLeft, Users, Settings2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function EventCreateClient() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay for UI completeness since we skip the actual route for now
        setTimeout(() => {
            toast({ title: "Event created successfully! 🎉", variant: "success" as any });
            router.push("/organizer/events");
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Link href="/organizer/events" className="hover:text-foreground transition-colors flex items-center text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Events
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-display font-bold">Create New Event</h1>
                <p className="text-muted-foreground mt-1">Design and publish an event for your club.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Basic Info */}
                <div className="nexus-card p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2 border-b pb-4">
                        <AlignLeft className="w-5 h-5 text-purple-500" /> Basic Details
                    </h2>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label>Event Title <span className="text-red-500">*</span></Label>
                            <Input placeholder="e.g. Intro to Machine Learning Workshop" required className="h-11" />
                        </div>

                        <div className="space-y-2">
                            <Label>Description <span className="text-red-500">*</span></Label>
                            <textarea
                                className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px]"
                                placeholder="What will attendees learn? What's the agenda?"
                                required
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Event Type</Label>
                                <select className="w-full h-11 border border-input bg-transparent rounded-xl px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                                    <option value="WORKSHOP">Workshop</option>
                                    <option value="HACKATHON">Hackathon</option>
                                    <option value="SEMINAR">Seminar</option>
                                    <option value="CULTURAL">Cultural Event</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Format</Label>
                                <select className="w-full h-11 border border-input bg-transparent rounded-xl px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                                    <option value="OFFLINE">In-Person (Offline)</option>
                                    <option value="ONLINE">Online</option>
                                    <option value="HYBRID">Hybrid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Time & Location */}
                <div className="nexus-card p-6 md:p-8 space-y-6">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2 border-b pb-4">
                        <Calendar className="w-5 h-5 text-blue-500" /> Date & Location
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Start Time <span className="text-red-500">*</span></Label>
                            <Input type="datetime-local" className="h-11" required />
                        </div>
                        <div className="space-y-2">
                            <Label>End Time <span className="text-red-500">*</span></Label>
                            <Input type="datetime-local" className="h-11" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label>Venue / Meeting Link <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input placeholder="Room 304, Main Block OR https://meet.google.com/..." className="pl-9 h-11" required />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Registration & Settings */}
                <div className="nexus-card p-6 md:p-8 space-y-6">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2 border-b pb-4">
                        <Settings2 className="w-5 h-5 text-orange-500" /> Registration Setup
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Capacity (Optional)</Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input type="number" placeholder="Leave empty for unlimited" className="pl-9 h-11" />
                            </div>
                            <p className="text-[10px] text-muted-foreground">Maximum number of attendees</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Requires Approval?</Label>
                            <select className="w-full h-11 border border-input bg-transparent rounded-xl px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                                <option value="false">No - Auto accept all</option>
                                <option value="true">Yes - Manual approval required</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section 4: Media */}
                <div className="nexus-card p-6 md:p-8 space-y-4">
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2 border-b pb-4">
                        <ImageIcon className="w-5 h-5 text-pink-500" /> Event Poster
                    </h2>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                        <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">Click to upload poster image</p>
                        <p className="text-xs text-muted-foreground mt-1">1920x1080px (16:9) recommended</p>
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="flex gap-4 justify-end border-t pt-6 bg-background sticky bottom-0 z-20 pb-4">
                    <Button type="button" variant="outline" className="h-11 px-6">Save as Draft</Button>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white h-11 px-8 shadow-md" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Event"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
