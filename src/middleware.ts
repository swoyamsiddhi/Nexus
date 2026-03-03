import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(function middleware(req: NextRequest & { auth: { user?: { role?: string; onboardingStatus?: string; verificationStatus?: string } } | null }) {
    const { pathname } = req.nextUrl;
    const session = req.auth;
    const user = session?.user;

    // Public paths — always allow
    const publicPaths = ["/", "/auth/signin", "/auth/signup", "/auth/verify-email", "/auth/error", "/onboarding"];
    if (publicPaths.some(p => pathname === p || pathname.startsWith(p)) || pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Not authenticated → sign in
    if (!user) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // NOTE: Onboarding gate is intentionally NOT here.
    // Middleware reads the JWT cookie directly which may be stale after onboarding completes.
    // Each role's layout.tsx checks onboardingStatus server-side via auth() which re-runs
    // the JWT callback with a fresh DB lookup, ensuring accuracy.

    // Organizer/Faculty verification gate
    if (user.role === "ORGANIZER" && user.verificationStatus === "PENDING" && pathname.startsWith("/organizer")) {
        return NextResponse.redirect(new URL("/auth/pending-approval", req.url));
    }
    if (user.role === "FACULTY" && user.verificationStatus === "PENDING" && pathname.startsWith("/faculty")) {
        return NextResponse.redirect(new URL("/auth/pending-approval", req.url));
    }

    // Role enforcement
    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/auth/error?error=AccessDenied", req.url));
    }
    if (pathname.startsWith("/organizer") && !["ORGANIZER", "ADMIN"].includes(user.role || "")) {
        return NextResponse.redirect(new URL("/auth/error?error=AccessDenied", req.url));
    }
    if (pathname.startsWith("/faculty") && !["FACULTY", "ADMIN"].includes(user.role || "")) {
        return NextResponse.redirect(new URL("/auth/error?error=AccessDenied", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
