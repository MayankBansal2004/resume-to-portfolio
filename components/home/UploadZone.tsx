"use client";

import { UploadIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const TAGS = ["🔒 100% Private", "⚡ 30-sec generation", "🌍 Instant publish"];

export function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (f) setFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
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
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
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
        <div className="animate-float flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/15 text-indigo-400">
          <UploadIcon size={40} strokeWidth={1.5} />
        </div>

        {file ? (
          <>
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-100">
                {file.name}
              </p>
              <p className="mt-1 text-sm text-emerald-400">
                ✓ Ready to generate your portfolio
              </p>
            </div>
            <Button
              id="generate-portfolio-btn"
              variant="primary"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                alert("Portfolio generation coming soon! 🎉");
              }}
            >
              ⚡ Generate Portfolio
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
