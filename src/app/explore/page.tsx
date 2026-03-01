"use client";

import { useState } from "react";
import { useClubs } from "@/hooks/useClubs";
import { Search, Filter, Users, Calendar } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    "All", "Academic", "Arts", "Athletics", "Culture", "Environment",
    "Greek Life", "Media", "Music", "Political", "Religious",
    "Service", "Social", "STEM", "Wellness",
];

export default function ExplorePage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<"members" | "events" | "newest">("members");

    const { data, isLoading } = useClubs({
        search,
        category: category === "All" ? "" : category,
        page,
        sort,
        pageSize: 12,
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-card px-6 py-8">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-4 text-3xl font-bold">Explore Clubs</h1>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                placeholder="Search clubs..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm outline-none ring-nexus-500 focus:ring-2"
                            />
                        </div>
                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as typeof sort)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none ring-nexus-500 focus:ring-2"
                        >
                            <option value="members">Most Members</option>
                            <option value="events">Most Events</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-8">
                {/* Category pills */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setCategory(cat === "All" ? "" : cat); setPage(1); }}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${(cat === "All" && !category) || category === cat
                                    ? "bg-nexus-500 text-white"
                                    : "border bg-card hover:bg-muted"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results */}
                {isLoading ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="skeleton h-48 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-sm text-muted-foreground">
                            {data?.total ?? 0} clubs found
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {data?.data.map((club) => (
                                <Link
                                    key={club.id}
                                    href={`/clubs/${club.slug}`}
                                    className="club-card group block rounded-2xl border bg-card shadow-sm"
                                >
                                    {/* Banner */}
                                    <div className="relative h-24 overflow-hidden rounded-t-2xl bg-gradient-to-br from-nexus-600 to-nexus-900">
                                        {club.bannerUrl && (
                                            <img src={club.bannerUrl} alt="" className="h-full w-full object-cover" />
                                        )}
                                        {club.isVerified && (
                                            <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-nexus-700">
                                                Verified ✓
                                            </div>
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="-mt-8 mb-3 flex items-end gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-background bg-nexus-100 text-lg font-bold text-nexus-700 shadow-sm dark:bg-nexus-950">
                                                {club.logoUrl ? (
                                                    <img src={club.logoUrl} alt={club.name} className="rounded-xl" />
                                                ) : (
                                                    club.name.charAt(0)
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="mb-1 font-semibold group-hover:text-nexus-600">{club.name}</h3>
                                        {club.shortBio && (
                                            <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{club.shortBio}</p>
                                        )}
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" /> {club._count.memberships}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {club._count.events}
                                            </span>
                                            <span className="ml-auto rounded-full bg-muted px-2 py-0.5">{club.category}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {data && (data.hasNextPage || data.hasPrevPage) && (
                            <div className="mt-8 flex justify-center gap-2">
                                <button
                                    disabled={!data.hasPrevPage}
                                    onClick={() => setPage(p => p - 1)}
                                    className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
                                >
                                    ← Previous
                                </button>
                                <span className="rounded-lg border bg-muted px-4 py-2 text-sm">
                                    Page {page}
                                </span>
                                <button
                                    disabled={!data.hasNextPage}
                                    onClick={() => setPage(p => p + 1)}
                                    className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
