// components/practice/AnswerBox.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Paperclip } from "lucide-react";

interface AnswerBoxProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function AnswerBox({
  value,
  onChange,
  maxLength = 2000,
}: AnswerBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 400)}px`;
  }, [value]);

  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.9;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm sm:p-5">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="Type your answer here..."
        rows={5}
        className="max-h-[400px] min-h-[140px] w-full resize-none bg-transparent text-sm leading-relaxed text-white placeholder:text-gray-500 outline-none sm:text-base"
      />

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Record voice answer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition-colors duration-200 hover:border-purple-400/40 hover:bg-white/10 hover:text-white"
          >
            <Mic className="h-4 w-4" strokeWidth={1.8} />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Attach file"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition-colors duration-200 hover:border-purple-400/40 hover:bg-white/10 hover:text-white"
          >
            <Paperclip className="h-4 w-4" strokeWidth={1.8} />
          </motion.button>
        </div>

        <span
          className={`text-xs font-medium ${
            isNearLimit ? "text-amber-400" : "text-gray-500"
          }`}
        >
          {characterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}