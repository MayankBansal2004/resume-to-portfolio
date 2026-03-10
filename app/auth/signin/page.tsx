"use client";

import { signIn } from "next-auth/react";
import { GithubIcon } from "@/components/icons/Icons";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030711] relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute rounded-full blur-3xl animate-pulse-glow"
                    style={{
                        width: 600, height: 600,
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto px-6">
                {/* Card */}
                <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-10 text-center shadow-2xl">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-600">
                            <span className="text-white text-lg">⚡</span>
                        </div>
                        <span
                            className="text-2xl font-bold text-slate-100"
                            style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                        >
                            Portfolio<span className="text-gradient">AI</span>
                        </span>
                    </div>

                    <h1
                        className="text-2xl font-bold text-slate-100 mb-2"
                        style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                    >
                        Welcome back
                    </h1>
                    <p className="text-slate-400 mb-8 text-sm">
                        Sign in to manage and publish your portfolio
                    </p>

                    {/* Google OAuth Button */}
                    <button
                        id="google-signin-btn"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-200 font-medium text-sm hover:bg-slate-800 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300"
                    >
                        {/* Google "G" logo */}
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="mt-6 text-xs text-slate-600">
                        By signing in, you agree to our{" "}
                        <a href="#" className="text-slate-400 hover:text-slate-200 underline underline-offset-2">
                            Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-slate-400 hover:text-slate-200 underline underline-offset-2">
                            Privacy Policy
                        </a>
                    </p>
                </div>

                {/* Back link */}
                <p className="mt-6 text-center text-sm text-slate-600">
                    <a href="/" className="hover:text-slate-300 transition-colors">
                        ← Back to home
                    </a>
                </p>
            </div>
        </div>
    );
}
