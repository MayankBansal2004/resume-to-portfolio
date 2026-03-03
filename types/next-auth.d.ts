// Augment the built-in NextAuth types to include our custom fields
// so TypeScript knows about `session.accessToken`, `session.error`, etc.

import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        error?: string;
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        userId?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
    }
}
