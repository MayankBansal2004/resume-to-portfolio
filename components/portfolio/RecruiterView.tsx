"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Briefcase, MessageSquareText, Send, Sparkles, X, UserSearch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StarterQA {
    question: string;
    answer: string;
}

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface RecruiterViewProps {
    publicId: string;
    themeId: string;
    previewActive?: boolean;
}

// Colors adapted from existing themes
const themeStyles: Record<string, { border: string; buttonBg: string; buttonText: string; userBg: string; userText: string; assistantBorder: string; badge: string; drawerBg: string }> = {
    minimalist: {
        border: "border-zinc-600/30",
        buttonBg: "bg-zinc-800 hover:bg-zinc-700",
        buttonText: "text-zinc-100",
        userBg: "bg-zinc-700 text-zinc-100",
        userText: "text-zinc-100",
        assistantBorder: "border-zinc-700 bg-zinc-900/50",
        badge: "text-zinc-300",
        drawerBg: "bg-zinc-950/95",
    },
    nebula: {
        border: "border-indigo-400/30",
        buttonBg: "bg-indigo-600/80 hover:bg-indigo-500/80",
        buttonText: "text-indigo-50",
        userBg: "bg-indigo-500/80 text-white",
        userText: "text-white",
        assistantBorder: "border-indigo-400/20 bg-indigo-950/30",
        badge: "text-indigo-300",
        drawerBg: "bg-[#0B0F19]/95",
    },
    aurora: {
        border: "border-emerald-400/30",
        buttonBg: "bg-emerald-600/80 hover:bg-emerald-500/80",
        buttonText: "text-emerald-50",
        userBg: "bg-emerald-500/80 text-white",
        userText: "text-white",
        assistantBorder: "border-emerald-400/20 bg-emerald-950/30",
        badge: "text-emerald-300",
        drawerBg: "bg-[#061B14]/95",
    },
    terminal: {
        border: "border-green-400/30",
        buttonBg: "bg-green-600/80 hover:bg-green-500/80",
        buttonText: "text-green-50",
        userBg: "bg-green-500/80 text-white",
        userText: "text-white",
        assistantBorder: "border-green-400/20 bg-green-950/30",
        badge: "text-green-300",
        drawerBg: "bg-[#0B150F]/95",
    },
};

export function RecruiterView({ publicId, themeId, previewActive = false }: RecruiterViewProps) {
    const [open, setOpen] = useState(false);
    const [loadingStarter, setLoadingStarter] = useState(false);
    const [loadingReply, setLoadingReply] = useState(false);
    const [starter, setStarter] = useState<StarterQA[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const hasData = useMemo(() => starter.length > 0 || messages.length > 0, [starter.length, messages.length]);
    const th = themeStyles[themeId] || themeStyles.minimalist;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loadingReply, starter]);

    const openPanel = async () => {
        setOpen(true);
        if (hasData || loadingStarter) return;

        setError(null);
        setLoadingStarter(true);
        try {
            const response = await fetch(`/api/recruiter/${encodeURIComponent(publicId)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: "bootstrap" }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data?.error || "Failed to load recruiter prompts");

            const items = Array.isArray(data?.items) ? data.items : [];
            setStarter(items.slice(0, 3));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load recruiter prompts");
        } finally {
            setLoadingStarter(false);
        }
    };

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || loadingReply) return;

        const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
        setMessages(nextMessages);
        setInput("");
        setLoadingReply(true);
        setError(null);

        try {
            const response = await fetch(`/api/recruiter/${encodeURIComponent(publicId)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mode: "chat",
                    question: trimmed,
                    history: nextMessages,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data?.error || "Failed to get response");

            const answer = typeof data?.answer === "string" ? data.answer : "I could not generate a response.";
            setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to get response");
        } finally {
            setLoadingReply(false);
        }
    };

    return (
        <>
            <button
                onClick={openPanel}
                className={`fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border bg-zinc-900/85 px-4 py-2.5 text-sm font-medium backdrop-blur-xl transition shadow-lg ${th.border} ${th.buttonText} hover:scale-105 active:scale-95 ${previewActive ? 'hidden' : ''}`}
            >
                <Briefcase size={15} />
                Recruiter view
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`fixed bottom-20 left-5 z-[60] flex h-[600px] max-h-[75vh] w-[calc(100vw-40px)] sm:w-[400px] flex-col rounded-2xl border shadow-2xl overflow-hidden ${th.drawerBg} ${th.border}`}
                    >
                        <div className={`flex items-center justify-between border-b px-5 py-4 bg-black/20 backdrop-blur-md ${th.border}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border ${th.border}`}>
                                        <UserSearch className={`h-5 w-5 ${th.badge}`} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-zinc-400">Recruiter Copilot</p>
                                        <h3 className="text-sm font-semibold text-white">Interview Assistant</h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                                    aria-label="Close recruiter view"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 scroll-smooth">
                                <div className={`rounded-xl border p-4 text-sm text-zinc-300 ${th.assistantBorder}`}>
                                    <p className="mb-2 font-medium text-white">Welcome to the Recruiter View! 👋</p>
                                    <p>I have analyzed this resume and prepared 3 interview questions below. Feel free to ask me follow-up questions about the candidate&apos;s experience, skills, or projects.</p>
                                </div>

                                {loadingStarter && (
                                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                                        <Sparkles className="h-4 w-4 animate-pulse" />
                                        Analyzing resume and generating insights...
                                    </div>
                                )}

                                {!loadingStarter && starter.length > 0 && (
                                    <div className="space-y-4">
                                        {starter.map((item, idx) => (
                                            <div key={idx} className={`rounded-2xl border p-4 shadow-sm ${th.assistantBorder}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold ${th.badge}`}>{idx + 1}</span>
                                                    <h4 className="font-medium text-zinc-100 text-sm">{item.question}</h4>
                                                </div>
                                                <p className="text-sm text-zinc-300 leading-relaxed pl-8">
                                                    <span className="font-semibold text-zinc-400 text-xs uppercase block mb-1">Suggested Answer</span>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                                msg.role === "user"
                                                    ? `${th.userBg} rounded-tr-sm`
                                                    : `border ${th.assistantBorder} text-zinc-200 rounded-tl-sm`
                                            }`}
                                        >
                                            {msg.role === "assistant" && (
                                                <MessageSquareText size={14} className={`mb-2 opacity-50 ${th.badge}`} />
                                            )}
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {loadingReply && (
                                    <div className="flex w-full justify-start">
                                        <div className={`max-w-[85%] rounded-2xl rounded-tl-sm border px-4 py-3 text-sm flex items-center gap-2 ${th.assistantBorder} text-zinc-400`}>
                                            <Sparkles size={14} className="animate-spin opacity-50" />
                                            Thinking...
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="h-2" /> {/* Bottom spacer */}
                            </div>

                            <div className={`border-t bg-black/20 p-4 backdrop-blur-md ${th.border}`}>
                                <div className="relative flex items-end gap-2">
                                    <textarea
                                        value={input}
                                        onChange={(event) => setInput(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" && !event.shiftKey) {
                                                event.preventDefault();
                                                sendMessage();
                                            }
                                        }}
                                        placeholder="Ask about specific skills or experience..."
                                        className={`max-h-32 min-h-[52px] w-full resize-none rounded-xl border bg-black/40 py-3 pl-4 pr-12 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 transition-colors focus:bg-black/60 focus:border-white/20 ${th.border}`}
                                        rows={1}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={loadingReply || !input.trim()}
                                        className={`absolute bottom-1.5 right-1.5 flex h-10 w-10 items-center justify-center rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-50 ${th.buttonBg} ${th.buttonText}`}
                                        aria-label="Send message"
                                    >
                                        <Send size={15} className="-ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
