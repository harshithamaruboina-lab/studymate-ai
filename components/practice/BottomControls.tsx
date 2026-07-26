// components/practice/BottomControls.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, LogOut } from "lucide-react";

interface BottomControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onEndSession: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export default function BottomControls({
  onPrevious,
  onNext,
  onSubmit,
  onEndSession,
  isFirstQuestion,
  isLastQuestion,
}: BottomControlsProps) {
  return (
    <div className="flex flex-col-reverse items-stretch gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          whileHover={!isFirstQuestion ? { scale: 1.02 } : undefined}
          whileTap={!isFirstQuestion ? { scale: 0.98 } : undefined}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </motion.button>

        <motion.button
          type="button"
          onClick={onNext}
          disabled={isLastQuestion}
          whileHover={!isLastQuestion ? { scale: 1.02 } : undefined}
          whileTap={!isLastQuestion ? { scale: 0.98 } : undefined}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-gray-300"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={onEndSession}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors duration-200 hover:bg-red-400/20"
        >
          <LogOut className="h-4 w-4" />
          End Session
        </motion.button>

        <motion.button
          type="button"
          onClick={() => alert("Submit button clicked")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(59,130,246,0.6)]"
        >
          <Check className="h-4 w-4" />
          Submit Answer
        </motion.button>
      </div>
    </div>
  );
}