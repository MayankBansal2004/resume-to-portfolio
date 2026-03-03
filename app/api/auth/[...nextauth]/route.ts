import { handlers } from "@/auth";

// Catch-all route — NextAuth handles:
//   GET  /api/auth/session
//   POST /api/auth/signin/:provider
//   GET  /api/auth/callback/:provider
//   POST /api/auth/signout
//   ... and more
export const { GET, POST } = handlers;
