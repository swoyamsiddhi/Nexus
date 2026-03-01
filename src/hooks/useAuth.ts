"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated";
    const user = session?.user;

    const login = async (provider?: string) => {
        if (provider) {
            await signIn(provider, { callbackUrl: "/dashboard" });
        } else {
            await signIn(undefined, { callbackUrl: "/dashboard" });
        }
    };

    const logout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const requireAuth = (callback: () => void) => {
        if (!isAuthenticated) {
            signIn();
            return;
        }
        callback();
    };

    return {
        user,
        session,
        isLoading,
        isAuthenticated,
        isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
        login,
        logout,
        requireAuth,
    };
}
