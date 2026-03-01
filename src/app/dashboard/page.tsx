"use client";

import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useClubs } from "@/hooks/useClubs";
import { formatRelativeTime } from "@/lib/utils";
import { Bell, Users, Calendar, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();
    const { notifications, unreadCount, markAllAsRead } = useNotifications();
    const { data: clubsData } = useClubs({ pageSize: 6 });

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Welcome back, {user?.name?.split(" ")[0]} 👋
                    </h1>
                    <p className="text-muted-foreground">Here&apos;s what&apos;s happening in your clubs.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "My Clubs", value: "4", icon: Users, color: "text-nexus-600" },
                                { label: "Events RSVPd", value: "12", icon: Calendar, color: "text-emerald-600" },
                                { label: "Notifications", value: unreadCount, icon: Bell, color: "text-amber-600" },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Discover clubs */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-nexus-600" />
                                <h2 className="text-lg font-semibold">Discover Clubs</h2>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {clubsData?.data.map((club) => (
                                    <a
                                        key={club.id}
                                        href={`/clubs/${club.slug}`}
                                        className="club-card flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-nexus-100 text-sm font-bold text-nexus-700 dark:bg-nexus-950">
                                            {club.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">{club.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {club._count.memberships} members
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Notifications sidebar */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="flex items-center justify-between border-b p-4">
                            <div className="flex items-center gap-2">
                                <Bell className="h-4 w-4" />
                                <h2 className="font-semibold">Notifications</h2>
                                {unreadCount > 0 && (
                                    <span className="rounded-full bg-nexus-500 px-2 py-0.5 text-xs text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={() => markAllAsRead()}
                                    className="text-xs text-nexus-600 hover:underline"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>
                        <div className="divide-y">
                            {notifications.length === 0 ? (
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.slice(0, 8).map((n) => (
                                    <div
                                        key={n.id}
                                        className={`flex gap-3 p-4 ${!n.isRead ? "bg-nexus-50/50 dark:bg-nexus-950/30" : ""}`}
                                    >
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-nexus-100 text-xs font-bold text-nexus-700 dark:bg-nexus-950">
                                            {n.sender?.name?.charAt(0) ?? "N"}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm leading-snug">{n.message}</p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {formatRelativeTime(n.createdAt)}
                                            </p>
                                        </div>
                                        {!n.isRead && (
                                            <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-nexus-500" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
