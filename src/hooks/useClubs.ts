"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClubSummary, CreateClubInput, PaginatedResponse } from "@/types";
import { buildSearchParams } from "@/lib/utils";

interface UseClubsOptions {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    sort?: "members" | "events" | "newest";
}

async function fetchClubs(
    options: UseClubsOptions
): Promise<PaginatedResponse<ClubSummary>> {
    const params = buildSearchParams(options as Record<string, string | number | boolean | undefined>);
    const res = await fetch(`/api/clubs?${params}`);
    if (!res.ok) throw new Error("Failed to fetch clubs");
    return res.json();
}

async function createClub(data: CreateClubInput): Promise<ClubSummary> {
    const res = await fetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error ?? "Failed to create club");
    }
    return res.json();
}

export function useClubs(options: UseClubsOptions = {}) {
    return useQuery({
        queryKey: ["clubs", options],
        queryFn: () => fetchClubs(options),
        placeholderData: (prev) => prev,
    });
}

export function useCreateClub() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createClub,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clubs"] });
        },
    });
}

export function useClub(slug: string) {
    return useQuery({
        queryKey: ["club", slug],
        queryFn: async () => {
            const res = await fetch(`/api/clubs/${slug}`);
            if (!res.ok) throw new Error("Club not found");
            return res.json();
        },
        enabled: !!slug,
    });
}

export function useJoinClub() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (clubId: string) => {
            const res = await fetch(`/api/clubs/${clubId}/members`, {
                method: "POST",
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error ?? "Failed to join club");
            }
            return res.json();
        },
        onSuccess: (_data, clubId) => {
            queryClient.invalidateQueries({ queryKey: ["club"] });
            queryClient.invalidateQueries({ queryKey: ["clubs"] });
        },
    });
}
