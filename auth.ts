import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

// ── Token refresh helper ────────────────────────────────────────────────────

interface RefreshableToken {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: string;
    [key: string]: unknown;
}

async function refreshAccessToken(token: RefreshableToken): Promise<RefreshableToken> {
    try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            }),
        });

        const refreshed = await response.json();

        if (!response.ok) {
            throw new Error(`Google token refresh failed: ${JSON.stringify(refreshed)}`);
        }

        return {
            ...token,
            accessToken: refreshed.access_token,
            // expires_in is in seconds → convert to absolute ms timestamp
            accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
            // Rotate refresh token only if Google sends a new one (rare)
            refreshToken: refreshed.refresh_token ?? token.refreshToken,
            error: undefined,
        };
    } catch (error) {
        console.error("[auth] Failed to refresh access token:", error);
        return { ...token, error: "RefreshAccessTokenError" };
    }
}

// ── Full NextAuth config (Node.js runtime only) ─────────────────────────────
// Extends the Edge-safe authConfig with PrismaAdapter + detailed Google params.
// Imported by API routes and server components — never by middleware.

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,

    adapter: PrismaAdapter(prisma),

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    access_type: "offline",   // Request refresh_token
                    prompt: "consent",         // Always show consent so refresh_token is returned
                    response_type: "code",
                    scope: "openid profile email",
                },
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        // ── jwt ───────────────────────────────────────────────────────────────
        async jwt({ token, account, user }) {
            // First sign-in: store tokens from Google in the JWT
            if (account && user) {
                return {
                    ...token,
                    userId: user.id,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at
                        ? account.expires_at * 1000  // Convert Unix seconds → ms
                        : Date.now() + 3600 * 1000,
                };
            }

            const t = token as RefreshableToken;

            // Token still valid → pass through
            if (Date.now() < t.accessTokenExpires) {
                return token;
            }

            // Token expired → silently refresh without prompting the user
            console.log("[auth] Access token expired — refreshing silently...");
            return refreshAccessToken(t);
        },

        // ── session ───────────────────────────────────────────────────────────
        // Expose the minimum needed on the client side.
        async session({ session, token }) {
            const t = token as RefreshableToken;
            session.user.id = t.userId as string;
            session.accessToken = t.accessToken;
            if (t.error) session.error = t.error; // client can react to refresh failures
            return session;
        },
    },

    debug: process.env.NODE_ENV === "development",
});
