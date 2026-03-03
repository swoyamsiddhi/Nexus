"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, XCircle, User, ShieldAlert, Filter, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials, generateAvatarColor, timeAgo } from "@/lib/utils";

const ROLE_COLORS: Record<string, string> = {
    STUDENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    FACULTY: "bg-green-500/10 text-green-400 border-green-500/20",
    ORGANIZER: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    ADMIN: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function AdminUsersClient({ users: initialUsers, activeFilter }: any) {
    const router = useRouter();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<string | null>(null);

    const filtered = users.filter((u: any) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    const handleVerify = async (userId: string, action: "approve" | "reject") => {
        setLoading(userId + action);
        try {
            const res = await fetch(`/api/admin/verify`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            });
            if (res.ok) {
                setUsers((prev: any[]) =>
                    prev.map(u => u.id === userId
                        ? { ...u, verificationStatus: action === "approve" ? "APPROVED" : "REJECTED" }
                        : u
                    )
                );
            }
        } finally {
            setLoading(null);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-6"
        >
            <motion.div variants={fadeInUp}>
                <h1 className="text-2xl font-display font-bold tracking-tight">User Management</h1>
                <p className="text-sm text-muted-foreground mt-1 font-medium">View, verify, and manage campus platform users</p>
            </motion.div>

            {/* Filter pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-64 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-11 bg-card border-border/50 focus-visible:ring-primary shadow-sm rounded-xl"
                    />
                </div>
                <div className="flex gap-2">
                    {[["all", "All Users"], ["pending", "Pending Approval"]].map(([value, label]) => (
                        <Button
                            key={value}
                            variant={activeFilter === value ? "default" : "outline"}
                            size="sm"
                            onClick={() => router.push(`/admin/users${value === "pending" ? "?filter=pending" : ""}`)}
                            className={cn(
                                "h-11 px-4 gap-2 rounded-xl border-border/50 font-medium transition-all",
                                activeFilter === value
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "hover:bg-accent/50"
                            )}
                        >
                            {value === "pending" && <ShieldAlert className={cn("w-4 h-4", activeFilter === value ? "text-primary-foreground" : "text-orange-400")} />}
                            {label}
                        </Button>
                    ))}
                </div>
            </motion.div>

            {/* Users Table */}
            <motion.div variants={fadeInUp} className="border border-border/50 rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3.5 bg-accent/30 border-b border-border/50 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>User</span>
                    <span className="hidden sm:block">Role</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>

                <div className="divide-y divide-border/30">
                    <AnimatePresence>
                        {filtered.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-16 text-muted-foreground"
                            >
                                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 border border-border/50">
                                    <User className="w-6 h-6 opacity-40" />
                                </div>
                                <p className="text-sm font-medium">No users found.</p>
                            </motion.div>
                        ) : (
                            filtered.map((user: any, i: number) => (
                                <motion.div
                                    key={user.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-accent/20 transition-colors group"
                                >
                                    {/* User info */}
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className={`w-10 h-10 rounded-xl ${generateAvatarColor(user.name || "")} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm border border-black/10`}>
                                            {getInitials(user.name || "?")}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Role */}
                                    <div className="hidden sm:block">
                                        <Badge variant="outline" className={`text-[10px] px-2 py-0 h-5 font-semibold ${ROLE_COLORS[user.role]}`}>
                                            {user.role}
                                        </Badge>
                                    </div>

                                    {/* Verification Status */}
                                    <div className="shrink-0 w-[90px]">
                                        {user.verificationStatus === "PENDING" ? (
                                            <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold w-fit">
                                                <AlertCircle className="w-3 h-3" /> PENDING
                                            </div>
                                        ) : user.verificationStatus === "APPROVED" ? (
                                            <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 font-bold w-fit">
                                                <CheckCircle2 className="w-3 h-3" /> APPROVED
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-bold w-fit">
                                                <XCircle className="w-3 h-3" /> REJECTED
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 shrink-0 justify-end min-w-[140px]">
                                        {user.verificationStatus === "PENDING" ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="h-8 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 font-semibold gap-1.5 text-xs rounded-lg"
                                                    disabled={!!loading}
                                                    onClick={() => handleVerify(user.id, "approve")}
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 p-0 bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400 rounded-lg"
                                                    disabled={!!loading}
                                                    onClick={() => handleVerify(user.id, "reject")}
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </>
                                        ) : (
                                            <div className="text-xs text-muted-foreground font-medium px-2 py-1 flex items-center h-8">
                                                No actions
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
