"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home, Compass, Network, BookOpen, User, Bell,
    Settings, LogOut, Zap, ChevronDown, Menu, X
} from "lucide-react";
import { useState } from "react";
import { cn, getInitials, generateAvatarColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const studentNav = [
    { href: "/student", label: "Home", icon: Home },
    { href: "/student/explore", label: "Explore", icon: Compass },
    { href: "/student/nexus", label: "Nexus", icon: Network },
    { href: "/student/research", label: "Research", icon: BookOpen },
    { href: "/student/profile", label: "Profile", icon: User },
];

const organizerNav = [
    { href: "/organizer", label: "Club Home", icon: Home },
    { href: "/organizer/events", label: "Events", icon: Compass },
    { href: "/organizer/recruit", label: "Recruit", icon: Network },
    { href: "/organizer/analytics", label: "Analytics", icon: BookOpen },
    { href: "/organizer/profile", label: "Profile", icon: User },
];

const facultyNav = [
    { href: "/faculty", label: "Lab Home", icon: Home },
    { href: "/faculty/publish", label: "Publish", icon: Compass },
    { href: "/faculty/applications", label: "Applications", icon: Network },
    { href: "/faculty/students", label: "Students", icon: BookOpen },
    { href: "/faculty/profile", label: "Profile", icon: User },
];

const adminNav = [
    { href: "/admin", label: "Overview", icon: Home },
    { href: "/admin/users", label: "Users", icon: User },
    { href: "/admin/content", label: "Content", icon: BookOpen },
    { href: "/admin/analytics", label: "Analytics", icon: Compass },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

const navMap: Record<string, typeof studentNav> = {
    STUDENT: studentNav,
    ORGANIZER: organizerNav,
    FACULTY: facultyNav,
    ADMIN: adminNav,
};

const roleTheme: Record<string, { gradient: string; accent: string; label: string }> = {
    STUDENT: { gradient: "from-blue-500 to-cyan-500", accent: "text-blue-500 bg-blue-50", label: "Student" },
    ORGANIZER: { gradient: "from-purple-500 to-pink-500", accent: "text-purple-500 bg-purple-50", label: "Organizer" },
    FACULTY: { gradient: "from-green-500 to-teal-500", accent: "text-green-600 bg-green-50", label: "Faculty" },
    ADMIN: { gradient: "from-orange-500 to-yellow-500", accent: "text-orange-500 bg-orange-50", label: "Admin" },
};

export function AppSidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const role = session?.user?.role || "STUDENT";
    const nav = navMap[role] || studentNav;
    const theme = roleTheme[role] || roleTheme.STUDENT;
    const name = session?.user?.name || "User";
    const email = session?.user?.email || "";
    const image = session?.user?.image;

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-2 px-4 py-5 border-b border-border">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-sm`}>
                    <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                    <span className="text-base font-display font-bold text-foreground">Campus Nexus</span>
                    <div className={`text-[10px] font-semibold uppercase tracking-wider ${theme.accent.split(" ")[0]} rounded-sm px-1`}>
                        {theme.label}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
                {nav.map(({ href, label, icon: Icon }) => {
                    const isActive = href === "/student" || href === "/organizer" || href === "/faculty" || href === "/admin"
                        ? pathname === href
                        : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "nav-item group",
                                isActive && "nav-item-active"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Notifications */}
            <div className="px-3 pb-2">
                <Link href="/student/nexus?tab=notifications" className="nav-item">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                    <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5">3</Badge>
                </Link>
            </div>

            {/* User menu */}
            <div className="border-t border-border p-3">
                <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors"
                >
                    {image ? (
                        <img src={image} alt={name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                        <div className={`w-8 h-8 rounded-full ${generateAvatarColor(name)} flex items-center justify-center text-white text-xs font-bold`}>
                            {getInitials(name)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-foreground truncate">{name}</p>
                        <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />
                </button>
                {userMenuOpen && (
                    <div className="mt-1 space-y-1 px-1">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-60 border-r border-border bg-card h-screen sticky top-0 flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile: hamburger + overlay drawer */}
            <div className="lg:hidden">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="fixed top-4 left-4 z-40 bg-card border border-border rounded-xl p-2 shadow-md"
                >
                    <Menu className="w-5 h-5" />
                </button>
                {mobileOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
                        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 flex flex-col animate-slide-in">
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <SidebarContent />
                        </aside>
                    </>
                )}
            </div>
        </>
    );
}
