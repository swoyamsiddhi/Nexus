import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isToday, isTomorrow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, fmt = "MMM d, yyyy") {
    return format(new Date(date), fmt);
}

export function formatDateTime(date: Date | string) {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function timeAgo(date: Date | string) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatEventDate(date: Date | string) {
    const d = new Date(date);
    if (isToday(d)) return `Today at ${format(d, "h:mm a")}`;
    if (isTomorrow(d)) return `Tomorrow at ${format(d, "h:mm a")}`;
    return format(d, "EEE, MMM d 'at' h:mm a");
}

export function slugify(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

export function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function truncate(str: string, len: number) {
    return str.length > len ? `${str.slice(0, len)}...` : str;
}

export function parseJsonArray(jsonStr: string | null | undefined): string[] {
    if (!jsonStr) return [];
    try {
        const parsed = JSON.parse(jsonStr);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function parseJsonObject(jsonStr: string | null | undefined): Record<string, unknown> {
    if (!jsonStr) return {};
    try {
        return JSON.parse(jsonStr) as Record<string, unknown>;
    } catch {
        return {};
    }
}

export function isCollegeDomain(email: string): boolean {
    const allowedDomains = (process.env.ALLOWED_EMAIL_DOMAINS || "college.edu")
        .split(",")
        .map((d) => d.trim().toLowerCase());
    const domain = email.split("@")[1]?.toLowerCase();
    return allowedDomains.includes(domain) || process.env.NODE_ENV === "development";
}

// Match Score Algorithm - skill-based matching
export function computeMatchScore(
    requiredSkills: string[],
    userSkills: string[],
    optionalFactors: { yearMatch?: boolean; branchMatch?: boolean; cgpaOk?: boolean } = {}
): number {
    if (requiredSkills.length === 0) return 75;

    const userSkillsLower = userSkills.map((s) => s.toLowerCase());
    const matched = requiredSkills.filter((skill) =>
        userSkillsLower.some(
            (us) => us.includes(skill.toLowerCase()) || skill.toLowerCase().includes(us)
        )
    ).length;

    let score = Math.round((matched / requiredSkills.length) * 70);
    if (optionalFactors.yearMatch) score += 10;
    if (optionalFactors.branchMatch) score += 10;
    if (optionalFactors.cgpaOk) score += 10;

    return Math.min(score, 100);
}

export function getMatchColor(score: number): string {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-gray-500 bg-gray-50 border-gray-200";
}

export function getRoleColor(role: string): string {
    switch (role) {
        case "STUDENT": return "student";
        case "ORGANIZER": return "organizer";
        case "FACULTY": return "faculty";
        case "ADMIN": return "admin";
        default: return "student";
    }
}

export function getRoleDashboard(role: string): string {
    switch (role) {
        case "STUDENT": return "/student";
        case "ORGANIZER": return "/organizer";
        case "FACULTY": return "/faculty";
        case "ADMIN": return "/admin";
        default: return "/student";
    }
}

export function formatCurrency(amount: number, currency = "INR") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
}

export function generateAvatarColor(name: string): string {
    const colors = [
        "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500",
        "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-red-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}
