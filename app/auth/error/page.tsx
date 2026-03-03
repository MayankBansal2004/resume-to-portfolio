import Link from "next/link";

const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
    Configuration: {
        title: "Server Configuration Error",
        description:
            "There is a problem with the server's authentication configuration. This is not an issue with your credentials.",
    },
    AccessDenied: {
        title: "Access Denied",
        description: "You do not have permission to sign in.",
    },
    Verification: {
        title: "Verification Failed",
        description: "The sign-in link is no longer valid. It may have been used already or it may have expired.",
    },
    OAuthSignin: {
        title: "OAuth Sign-in Error",
        description: "Could not initiate sign-in with the provider. Please try again.",
    },
    OAuthCallback: {
        title: "OAuth Callback Error",
        description:
            "The server could not complete the sign-in. This is often a temporary network issue — please try again.",
    },
    Default: {
        title: "Authentication Error",
        description: "An unexpected error occurred during sign-in. Please try again.",
    },
};

interface ErrorPageProps {
    searchParams: Promise<{ error?: string }>;
}

export default async function AuthErrorPage({ searchParams }: ErrorPageProps) {
    const { error } = await searchParams;
    const info = ERROR_MESSAGES[error ?? "Default"] ?? ERROR_MESSAGES.Default;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030711]">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: 500,
                        height: 500,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center">
                <div className="rounded-3xl border border-red-500/20 bg-slate-900/80 backdrop-blur-xl p-10 shadow-2xl">
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500/15 border border-red-500/30">
                            <span className="text-2xl">⚠️</span>
                        </div>
                    </div>

                    <h1
                        className="text-xl font-bold text-slate-100 mb-3"
                        style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                    >
                        {info.title}
                    </h1>

                    <p className="text-sm text-slate-400 mb-4">{info.description}</p>

                    {error && (
                        <p className="text-xs text-slate-600 mb-6 font-mono bg-slate-800/50 px-3 py-1.5 rounded-lg">
                            Error code: {error}
                        </p>
                    )}

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/auth/signin"
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm hover:border-slate-600 hover:text-slate-200 transition-all duration-300"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
