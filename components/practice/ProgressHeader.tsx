// components/practice/ProgressHeader.tsx
"use client";

import { motion } from "framer-motion";
import { Clock, Layers, Tag } from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";

interface ProgressHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  elapsedSeconds: number;
  difficulty: Difficulty;
  topic: string;
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  Medium: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  Hard: "border-red-400/20 bg-red-400/10 text-red-400",
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function ProgressHeader({
  currentQuestion,
  totalQuestions,
  elapsedSeconds,
  difficulty,
  topic,
}: ProgressHeaderProps) {
  const progressPercent = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-white">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${DIFFICULTY_STYLES[difficulty]}`}
          >
            <Layers className="h-3 w-3" />
            {difficulty}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-300">
            <Tag className="h-3 w-3" />
            {topic}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-400">
          <Clock className="h-3.5 w-3.5 text-cyan-300" />
          {formatTime(elapsedSeconds)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}