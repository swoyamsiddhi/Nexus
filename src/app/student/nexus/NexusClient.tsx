"use client";

import { useState } from "react";
import { MessageSquare, Users, Bell, Search, Star, MoreVertical, Send, UserPlus, CheckCircle2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials, generateAvatarColor, timeAgo, parseJsonArray } from "@/lib/utils";

const TABS = [
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "network", label: "Network", icon: Users },
    { id: "notifications", label: "Alerts", icon: Bell },
];

export default function NexusClient({ initialConnections, initialNotifications, currentUser }: any) {
    const [activeTab, setActiveTab] = useState("network");
    const [search, setSearch] = useState("");

    const filteredConnections = initialConnections.filter((c: any) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-card z-10 sticky top-0">
                <h1 className="text-2xl font-display font-bold">Nexus</h1>
                <p className="text-sm text-muted-foreground">Your campus network and communications</p>

                <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0",
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.id === "notifications" && initialNotifications.filter((n: any) => !n.isRead).length > 0 && (
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">

                {/* Network Tab */}
                {activeTab === "network" && (
                    <div className="h-full overflow-y-auto p-6 max-w-5xl mx-auto space-y-6">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Find students, alumni, faculty..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-11 bg-card border-border shadow-sm rounded-xl max-w-md"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredConnections.map((user: any) => (
                                <div key={user.id} className="nexus-card p-4 flex flex-col hover:border-primary/30 transition-all group">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-background shadow-sm">
                                            {user.image ? (
                                                <img src={user.image} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className={`w-full h-full ${generateAvatarColor(user.name || "")} flex items-center justify-center text-white text-sm font-bold`}>
                                                    {getInitials(user.name || "?")}
                                                </div>
                                            )}
                                        </div>
                                        {user.studentProfile?.availabilityStatus === "LOOKING_FOR_TEAM" && (
                                            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200 text-[10px] px-1.5 py-0 h-5">
                                                Seeking Team
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{user.name}</h3>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {user.studentProfile?.branch} · Year {user.studentProfile?.year}
                                        </p>
                                        {user.studentProfile?.skills && (
                                            <div className="flex flex-wrap gap-1 mt-1 mb-4">
                                                {parseJsonArray(user.studentProfile.skills).slice(0, 3).map(skill => (
                                                    <span key={skill} className="text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                        <Star className="w-2.5 h-2.5 opacity-50" /> {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <Button className="w-full mt-auto" variant="secondary" size="sm">
                                        <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Connect
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages Tab MVP Placeholder */}
                {activeTab === "messages" && (
                    <div className="h-full flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x border-t border-border bg-card">
                        <div className="w-full lg:w-80 flex flex-col h-full bg-muted/20">
                            <div className="p-4 border-b border-border">
                                <Input placeholder="Search messages..." className="h-9" />
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                <div className="p-3 rounded-xl bg-accent cursor-pointer border border-transparent">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-sm">Robotics Club Team</span>
                                        <span className="text-[10px] text-muted-foreground">12m</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">Hey! Are we still meeting for the chassis build?</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col h-full bg-background relative">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                                <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-sm font-medium">Select a conversation</p>
                                <p className="text-xs">Or start a new chat with a connection</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                    <div className="h-full overflow-y-auto p-6 max-w-3xl mx-auto space-y-2">
                        {initialNotifications.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">
                                <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>You&apos;re all caught up!</p>
                            </div>
                        ) : (
                            initialNotifications.map((notif: any) => (
                                <div key={notif.id} className={cn("nexus-card p-4 flex gap-4 transition-colors cursor-pointer", !notif.isRead ? "bg-primary/5 border-primary/20" : "")}>
                                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-muted-foreground">
                                        {notif.type === "EVENT_UPDATE" ? <Bell className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground mb-0.5">{notif.title}</p>
                                        <p className="text-sm text-muted-foreground">{notif.content}</p>
                                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {timeAgo(notif.createdAt)}
                                        </p>
                                    </div>
                                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
                                </div>
                            ))
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
