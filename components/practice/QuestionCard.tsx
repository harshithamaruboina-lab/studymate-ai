// components/practice/QuestionCard.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Code2 } from "lucide-react";

interface QuestionCardProps {
  questionId: string;
  title: string;
  description: string;
  codeSnippet?: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function QuestionCard({
  questionId,
  title,
  description,
  codeSnippet,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionId}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-400/5" />

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_25px_rgba(99,102,241,0.25)]">
            <HelpCircle className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">
              {title}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
          {description}
        </p>

        {codeSnippet && (
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2">
              <Code2 className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Code Snippet
              </span>
            </div>
            <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed text-gray-300">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}