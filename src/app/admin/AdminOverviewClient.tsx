"use client";

import Link from "next/link";
import {
    Users, Calendar, Building2, ShieldAlert, CheckCircle2,
    XCircle, Clock, ArrowRight, TrendingUp, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInitials, generateAvatarColor, timeAgo } from "@/lib/utils";

const ROLE_COLORS: Record<string, string> = {
    STUDENT: "bg-blue-50 text-blue-700",
    FACULTY: "bg-green-50 text-green-700",
    ORGANIZER: "bg-purple-50 text-purple-700",
    ADMIN: "bg-orange-50 text-orange-700",
};

export default function AdminOverviewClient({ stats, recentUsers }: any) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 space-y-8 pb-20">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground">Admin Overview</h1>
                <p className="text-muted-foreground mt-1">Platform health, verifications, and controls</p>
            </div>

            {/* Alert Banner */}
            {stats.pendingVerifications > 0 && (
                <div className="flex items-center justify-between gap-4 p-4 border border-orange-200 bg-orange-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <p className="text-sm font-medium text-orange-800">
                            {stats.pendingVerifications} account{stats.pendingVerifications > 1 ? "s" : ""} pending verification (Faculty &amp; Organizer)
                        </p>
                    </div>
                    <Link href="/admin/users?filter=pending">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white flex-shrink-0">
                            Review <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </Link>
                </div>
            )}

            {/* Platform Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-500/10" },
                    { label: "Pending Approvals", value: stats.pendingVerifications, icon: Clock, color: "text-orange-600", bg: "bg-orange-500/10" },
                    { label: "Total Events", value: stats.totalEvents, icon: Calendar, color: "text-purple-600", bg: "bg-purple-500/10" },
                    { label: "Active Clubs", value: stats.totalClubs, icon: Building2, color: "text-green-600", bg: "bg-green-500/10" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="nexus-card p-5">
                        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div className="text-3xl font-display font-bold text-foreground">{value}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-0.5">{label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Registrations */}
                <div className="lg:col-span-2 border rounded-2xl p-6 bg-card shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" /> Recent Registrations
                        </h2>
                        <Link href="/admin/users" className="text-sm text-primary hover:underline flex items-center gap-1">
                            All users <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentUsers.map((user: any) => (
                            <div key={user.id} className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
                                <div className={`w-9 h-9 rounded-full ${generateAvatarColor(user.name || "")} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                    {getInitials(user.name || "?")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-foreground truncate">{user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>
                                <Badge className={`text-[10px] px-1.5 h-5 ${ROLE_COLORS[user.role]}`}>{user.role}</Badge>
                                {user.verificationStatus === "PENDING" ? (
                                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-orange-50 text-orange-700 border-orange-200">Pending</Badge>
                                ) : (
                                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-green-50 text-green-700 border-green-200">Approved</Badge>
                                )}
                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(user.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="border rounded-2xl p-6 bg-card shadow-sm flex flex-col gap-4">
                    <h2 className="text-lg font-display font-semibold">Quick Actions</h2>
                    {[
                        { href: "/admin/users?filter=pending", label: "Review Pending Approvals", icon: ShieldAlert, highlight: stats.pendingVerifications > 0 },
                        { href: "/admin/users", label: "Manage All Users", icon: Users, highlight: false },
                        { href: "/admin/content", label: "Moderate Content", icon: Eye, highlight: false },
                    ].map(({ href, label, icon: Icon, highlight }) => (
                        <Link key={href} href={href}>
                            <div className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all hover:border-primary/30 hover:shadow-sm ${highlight ? "border-orange-200 bg-orange-50/50" : "border-border bg-accent/30"
                                }`}>
                                <Icon className={`w-5 h-5 ${highlight ? "text-orange-600" : "text-muted-foreground"}`} />
                                <span className={`text-sm font-medium ${highlight ? "text-orange-800" : "text-foreground"}`}>{label}</span>
                                {highlight && stats.pendingVerifications > 0 && (
                                    <span className="ml-auto text-xs font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded-full">{stats.pendingVerifications}</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
