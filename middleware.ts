import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Use ONLY the Edge-safe config — no Prisma, no Node.js built-ins.
// The full auth.ts (with PrismaAdapter + token refresh) is used only in
// server components and API routes, which run in the Node.js runtime.
export default NextAuth(authConfig).auth;

export const config = {
    // Run on all routes except Next.js internals and static assets
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
