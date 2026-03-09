"use client";

import { UploadIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const TAGS = ["🔒 100% Private", "⚡ 30-sec generation", "🌍 Instant publish"];

export function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "generating">("idle");
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFile = (f: File | undefined) => {
    if (f) {
      setFile(f);
      setError(null);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleGenerate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file) return;

    try {
      setStatus("uploading");
      setError(null);

      // 1. Upload Resume
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Failed to upload resume");

      // 2. Generate Portfolio via Gemini
      setStatus("generating");
      const generateRes = await fetch("/api/portfolio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId: uploadData.resumeId }),
      });

      const generateData = await generateRes.json();
      if (!generateRes.ok) throw new Error(generateData.error || "Failed to generate portfolio");

      // 3. Redirect to the newly generated portfolio
      router.push(`/portfolio/${generateData.slug}/${generateData.portfolioId}`);

    } catch (err) {
      console.error("Generation flow error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setStatus("idle");
    }
  };

  return (
    <section
      id="upload-zone"
      className="relative z-10 mx-auto max-w-3xl px-6 pb-24"
    >
      <div
        id="file-drop-zone"
        role="button"
        tabIndex={0}
        aria-label="Upload your resume"
        className={cn(
          "relative flex cursor-pointer flex-col items-center gap-5 rounded-3xl p-12",
          "border-2 border-dashed border-indigo-500/35",
          "bg-slate-900/50 backdrop-blur-xl",
          "transition-all duration-300",
          "hover:scale-[1.01] hover:border-indigo-400/70 hover:bg-indigo-500/5",
          "hover:shadow-[0_0_50px_rgba(99,102,241,0.15),inset_0_0_50px_rgba(99,102,241,0.04)]",
          isDragging && "scale-[1.01] border-indigo-400 bg-indigo-500/8"
        )}
        onClick={() => {
          if (status === "idle") inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && status === "idle") inputRef.current?.click();
        }}
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          ref={inputRef}
          id="resume-file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {/* Upload icon — lucide */}
        <div className={cn(
          "flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/15 text-indigo-400 transition-all",
          status === "idle" ? "animate-float" : "animate-pulse"
        )}>
          <UploadIcon size={40} strokeWidth={1.5} />
        </div>

        {error && (
          <div className="absolute top-4 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        {file ? (
          <>
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-100">
                {file.name}
              </p>
              <p className="mt-1 text-sm text-emerald-400">
                {status === "idle" ? "✓ Ready to generate your portfolio" : "Processing your file..."}
              </p>
            </div>

            <Button
              id="generate-portfolio-btn"
              variant="primary"
              size="lg"
              disabled={status !== "idle"}
              onClick={handleGenerate}
              className="mt-2"
            >
              {status === "uploading" && "☁️ Uploading..."}
              {status === "generating" && "🤖 AI is generating..."}
              {status === "idle" && "⚡ Generate Portfolio"}
            </Button>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="mb-1 text-xl font-semibold text-slate-100">
                Drop your resume here
              </p>
              <p className="text-slate-400">
                Supports <strong className="text-indigo-300">PDF</strong>,{" "}
                <strong className="text-indigo-300">DOC</strong>, and{" "}
                <strong className="text-indigo-300">DOCX</strong> files
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="block h-px w-14 bg-slate-800" />
              or click to browse
              <span className="block h-px w-14 bg-slate-800" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-indigo-500/20 bg-indigo-500/8 px-3 py-1.5 text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
