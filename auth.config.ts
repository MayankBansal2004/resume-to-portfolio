import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const PROTECTED_PREFIXES = ["/dashboard", "/portfolio", "/settings", "/onboarding"];
const AUTH_ROUTES = ["/auth/signin"];

/**
 * Edge-safe NextAuth config — NO Prisma, no Node.js built-ins.
 * Used exclusively by middleware which runs on the Edge Runtime.
 * The full config (with PrismaAdapter + token refresh) lives in auth.ts.
 */
export const authConfig = {
    providers: [
        // Providers must be listed here too so NextAuth knows about them,
        // but we omit the detailed authorization params (those only matter server-side).
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: { strategy: "jwt" },

    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },

    callbacks: {
        // "authorized" is checked by middleware before a route is served.
        // Keep this logic minimal and Edge-compatible.
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const path = nextUrl.pathname;

            // Logged-in user hitting sign-in → send to dashboard
            if (isLoggedIn && AUTH_ROUTES.some((r) => path.startsWith(r))) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            // Unauthed user hitting protected route → send to sign-in
            if (!isLoggedIn && PROTECTED_PREFIXES.some((p) => path.startsWith(p))) {
                const callbackUrl = encodeURIComponent(path);
                return Response.redirect(
                    new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl)
                );
            }

            return true;
        },
    },
} satisfies NextAuthConfig;
