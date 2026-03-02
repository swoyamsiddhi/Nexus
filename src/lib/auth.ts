import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isCollegeDomain, getRoleDashboard } from "@/lib/utils";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // JWT-only strategy — no PrismaAdapter (avoids DB session table conflicts with credentials provider)
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
        newUser: "/onboarding",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;

                    const isValid = await bcrypt.compare(password, user.password);
                    if (!isValid) return null;

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role,
                        onboardingStatus: user.onboardingStatus,
                        verificationStatus: user.verificationStatus,
                    };
                } catch (err) {
                    console.error("[auth] authorize error:", err);
                    return null;
                }
            },
        }),
        ...(process.env.GOOGLE_CLIENT_ID
            ? [
                GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                }),
            ]
            : []),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google" && user.email) {
                if (!isCollegeDomain(user.email)) return false;
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "STUDENT";
                token.onboardingStatus = (user as any).onboardingStatus || "PENDING";
                token.verificationStatus = (user as any).verificationStatus || "PENDING";
            }
            if (trigger === "update" && session) {
                token.role = session.role || token.role;
                token.onboardingStatus = session.onboardingStatus || token.onboardingStatus;
            }
            // Refresh from DB to pick up admin approvals, wrapped in try/catch for resilience
            if (token.id) {
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { id: token.id as string },
                        select: { role: true, onboardingStatus: true, verificationStatus: true, name: true, image: true },
                    });
                    if (dbUser) {
                        token.role = dbUser.role;
                        token.onboardingStatus = dbUser.onboardingStatus;
                        token.verificationStatus = dbUser.verificationStatus;
                        token.name = dbUser.name;
                        token.picture = dbUser.image;
                    }
                } catch {
                    // Continue with cached token values
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.onboardingStatus = token.onboardingStatus as string;
                session.user.verificationStatus = token.verificationStatus as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            try {
                if (new URL(url).origin === baseUrl) return url;
            } catch { }
            return baseUrl;
        },
    },
});

export { getRoleDashboard };
