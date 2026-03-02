"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle2, XCircle, User, ShieldAlert, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials, generateAvatarColor, timeAgo } from "@/lib/utils";

const ROLE_COLORS: Record<string, string> = {
    STUDENT: "bg-blue-50 text-blue-700 border-blue-200",
    FACULTY: "bg-green-50 text-green-700 border-green-200",
    ORGANIZER: "bg-purple-50 text-purple-700 border-purple-200",
    ADMIN: "bg-orange-50 text-orange-700 border-orange-200",
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
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold">User Management</h1>
                <p className="text-sm text-muted-foreground mt-1">View, verify, and manage campus platform users</p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-64 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-11"
                    />
                </div>
                <div className="flex gap-2">
                    {[["all", "All Users"], ["pending", "Pending Approval"]].map(([value, label]) => (
                        <Button
                            key={value}
                            variant={activeFilter === value ? "default" : "outline"}
                            size="sm"
                            onClick={() => router.push(`/admin/users${value === "pending" ? "?filter=pending" : ""}`)}
                            className={cn("h-9 gap-1.5", activeFilter === value && "shadow-sm")}
                        >
                            {value === "pending" && <ShieldAlert className="w-3.5 h-3.5" />}
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Users Table */}
            <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted/30 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>User</span>
                    <span className="hidden sm:block">Role</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>

                <div className="divide-y divide-border/50">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <User className="w-10 h-10 opacity-20 mb-3" />
                            <p className="text-sm">No users found.</p>
                        </div>
                    ) : (
                        filtered.map((user: any) => (
                            <div key={user.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-accent/30 transition-colors">
                                {/* User info */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-9 h-9 rounded-full ${generateAvatarColor(user.name || "")} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                        {getInitials(user.name || "?")}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm text-foreground truncate">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="hidden sm:block">
                                    <Badge className={`text-[10px] px-2 py-0.5 border ${ROLE_COLORS[user.role]}`}>
                                        {user.role}
                                    </Badge>
                                </div>

                                {/* Verification Status */}
                                <div className="shrink-0">
                                    {user.verificationStatus === "PENDING" ? (
                                        <span className="text-[10px] px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-semibold">
                                            PENDING
                                        </span>
                                    ) : user.verificationStatus === "APPROVED" ? (
                                        <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold">
                                            APPROVED
                                        </span>
                                    ) : (
                                        <span className="text-[10px] px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold">
                                            {user.verificationStatus}
                                        </span>
                                    )}
                                </div>

                                {/* Actions - verify/reject for pending */}
                                <div className="flex gap-1.5 shrink-0">
                                    {user.verificationStatus === "PENDING" && (
                                        <>
                                            <Button
                                                size="sm"
                                                className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white gap-1 text-xs"
                                                disabled={!!loading}
                                                onClick={() => handleVerify(user.id, "approve")}
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 px-2 border-red-200 text-red-700 hover:bg-red-50 text-xs"
                                                disabled={!!loading}
                                                onClick={() => handleVerify(user.id, "reject")}
                                            >
                                                <XCircle className="w-3.5 h-3.5" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
