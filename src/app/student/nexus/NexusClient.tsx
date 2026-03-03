"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, Bell, Search, Star, UserPlus, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials, generateAvatarColor, timeAgo, parseJsonArray } from "@/lib/utils";

const TABS = [
    { id: "network", label: "Network", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "notifications", label: "Alerts", icon: Bell },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function NexusClient({ initialConnections, initialNotifications, currentUser }: any) {
    const [activeTab, setActiveTab] = useState("network");
    const [search, setSearch] = useState("");

    const filteredConnections = initialConnections.filter((c: any) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border/50 bg-card/50 backdrop-blur-xl z-20 sticky top-0 shadow-sm">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-2xl font-display font-bold tracking-tight">Nexus</h1>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">Your campus network and communications</p>
                    </motion.div>

                    <nav className="flex gap-2 mt-5 overflow-x-auto scrollbar-hide pb-1">
                        {TABS.map(tab => {
                            const unreadCount = tab.id === "notifications" ? initialNotifications.filter((n: any) => !n.isRead).length : 0;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex-shrink-0 group"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={cn("relative z-10 flex items-center gap-2", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>
                                        <tab.icon className={cn("w-4 h-4", isActive && "fill-primary/20")} />
                                        {tab.label}
                                        {unreadCount > 0 && (
                                            <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] text-red-500 font-bold ml-1">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative bg-accent/10">
                <AnimatePresence mode="wait">
                    {/* Network Tab */}
                    {activeTab === "network" && (
                        <motion.div
                            key="network"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="h-full overflow-y-auto p-6 max-w-6xl mx-auto w-full"
                        >
                            <div className="relative mb-8 max-w-md mx-auto sm:mx-0">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, skills, or branch..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 h-12 bg-card border-border/50 shadow-sm rounded-xl font-medium focus-visible:ring-primary"
                                />
                            </div>

                            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredConnections.map((user: any) => (
                                    <motion.div key={user.id} variants={fadeInUp} className="group bg-card border border-border/50 rounded-2xl p-5 flex flex-col hover:shadow-lg hover:border-border transition-all duration-300">
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-border/50 group-hover:scale-105 transition-transform">
                                                {user.image ? (
                                                    <img src={user.image} className="w-full h-full object-cover" alt="" />
                                                ) : (
                                                    <div className={`w-full h-full ${generateAvatarColor(user.name || "")} flex items-center justify-center text-white text-lg font-bold`}>
                                                        {getInitials(user.name || "?")}
                                                    </div>
                                                )}
                                            </div>
                                            {user.studentProfile?.availabilityStatus === "LOOKING_FOR_TEAM" && (
                                                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] px-2 py-0.5 h-6 font-semibold">
                                                    Seeking Team
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{user.name}</h3>
                                            <p className="text-xs text-muted-foreground font-medium mb-3">
                                                {user.studentProfile?.branch || "Unknown Branch"} · Year {user.studentProfile?.year || "-"}
                                            </p>
                                            {user.studentProfile?.skills && (
                                                <div className="flex flex-wrap gap-1.5 mt-1 mb-5">
                                                    {parseJsonArray(user.studentProfile.skills).slice(0, 3).map(skill => (
                                                        <span key={skill} className="text-[10px] bg-accent border border-border/50 text-accent-foreground px-2 py-1 rounded-md flex items-center gap-1 font-medium">
                                                            <Star className="w-2.5 h-2.5 opacity-50 text-amber-500" /> {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <Button className="w-full mt-auto rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-semibold transition-colors">
                                            <UserPlus className="w-4 h-4 mr-2" /> Connect
                                        </Button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Messages Tab MVP Placeholder */}
                    {activeTab === "messages" && (
                        <motion.div
                            key="messages"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="h-full flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x border-t border-border/50 bg-card w-full max-w-6xl mx-auto"
                        >
                            <div className="w-full lg:w-80 flex flex-col h-full bg-muted/10 border-r border-border/50">
                                <div className="p-4 border-b border-border/50">
                                    <Input placeholder="Search messages..." className="h-10 bg-background rounded-xl border-border/50" />
                                </div>
                                <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                                    <div className="p-3.5 rounded-xl bg-primary/5 cursor-pointer border border-primary/20 hover:bg-primary/10 transition-colors">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="font-semibold text-sm">Robotics Club Team</span>
                                            <span className="text-[10px] text-primary font-medium">12m</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate font-medium">Hey! Are we still meeting for the chassis build?</p>
                                    </div>
                                    <div className="p-3.5 rounded-xl cursor-pointer border border-transparent hover:bg-accent/40 transition-colors">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="font-semibold text-sm">Alex Johnson</span>
                                            <span className="text-[10px] text-muted-foreground font-medium">1d</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">Thanks for the hackathon tips!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col h-full bg-background relative">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 border border-border/50">
                                        <MessageSquare className="w-8 h-8 opacity-40" />
                                    </div>
                                    <p className="text-base font-semibold text-foreground">Select a conversation</p>
                                    <p className="text-sm mt-1">Or start a new chat with a connection</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                        <motion.div
                            key="notifications"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="h-full overflow-y-auto p-6 max-w-3xl mx-auto w-full"
                        >
                            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
                                {initialNotifications.length === 0 ? (
                                    <div className="text-center py-24 text-muted-foreground">
                                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border/50">
                                            <Bell className="w-8 h-8 opacity-40" />
                                        </div>
                                        <p className="font-semibold text-foreground">You&apos;re all caught up!</p>
                                        <p className="text-sm mt-1">No new notifications right now.</p>
                                    </div>
                                ) : (
                                    initialNotifications.map((notif: any, i: number) => (
                                        <motion.div
                                            key={notif.id}
                                            variants={fadeInUp}
                                            className={cn(
                                                "group p-5 rounded-2xl flex gap-4 transition-all cursor-pointer border",
                                                !notif.isRead
                                                    ? "bg-primary/5 border-primary/20 shadow-[0_4px_24px_-10px_rgba(59,130,246,0.1)] hover:bg-primary/10"
                                                    : "bg-card border-border/50 hover:bg-accent/40 hover:border-border"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                                                !notif.isRead ? "bg-primary/10 text-primary" : "bg-accent text-muted-foreground"
                                            )}>
                                                {notif.type === "EVENT_UPDATE" ? <Bell className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1 pt-0.5">
                                                <p className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{notif.title}</p>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{notif.content}</p>
                                                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5 font-medium">
                                                    <Clock className="w-3.5 h-3.5 opacity-70" /> {timeAgo(notif.createdAt)}
                                                </p>
                                            </div>
                                            {!notif.isRead && (
                                                <div className="flex-shrink-0 pt-2">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
