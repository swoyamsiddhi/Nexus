"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import type { NotificationWithSender, ServerToClientEvents, ClientToServerEvents } from "@/types";

async function fetchNotifications(unreadOnly = false) {
    const res = await fetch(`/api/notifications?unread=${unreadOnly}`);
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json() as Promise<{
        data: NotificationWithSender[];
        total: number;
        unreadCount: number;
    }>;
}

export function useNotifications() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const query = useQuery({
        queryKey: ["notifications"],
        queryFn: () => fetchNotifications(),
        enabled: !!session?.user?.id,
        refetchInterval: 30_000, // Fallback polling every 30s
    });

    // Socket.io real-time connection
    useEffect(() => {
        if (!session?.user?.id) return;

        const socket = io({
            path: "/api/socket",
            autoConnect: true,
        });

        socket.on("connect", () => {
            setIsConnected(true);
            // Join user's personal room
            socket.emit("joinRoom", `user:${session.user.id}`);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("notification", (notification) => {
            // Optimistically update notifications cache
            queryClient.setQueryData(
                ["notifications"],
                (old: any) => {
                    if (!old) return old;
                    return {
                        ...old,
                        data: [notification, ...old.data],
                        unreadCount: (old.unreadCount ?? 0) + 1,
                    };
                }
            );
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [session?.user?.id, queryClient]);

    const markAsRead = useMutation({
        mutationFn: async (ids: string[]) => {
            const res = await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids }),
            });
            if (!res.ok) throw new Error("Failed to mark as read");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });

    const markAllAsRead = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ markAll: true }),
            });
            if (!res.ok) throw new Error("Failed to mark all as read");
        },
        onSuccess: () => {
            queryClient.setQueryData(["notifications"], (old: any) => ({
                ...old,
                data: old?.data?.map((n: NotificationWithSender) => ({ ...n, isRead: true })) ?? [],
                unreadCount: 0,
            }));
        },
    });

    return {
        notifications: query.data?.data ?? [],
        unreadCount: query.data?.unreadCount ?? 0,
        isLoading: query.isLoading,
        isConnected,
        markAsRead: markAsRead.mutate,
        markAllAsRead: markAllAsRead.mutate,
    };
}
