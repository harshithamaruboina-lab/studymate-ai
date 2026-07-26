// components/interview/InterviewerPanel.tsx
"use client";

import { motion } from "framer-motion";
import { Bot, Ear, Brain, AudioLines, Clock, Hash } from "lucide-react";

export type InterviewerStatus = "listening" | "thinking" | "speaking";

interface InterviewerPanelProps {
  status: InterviewerStatus;
  elapsedSeconds: number;
  questionNumber: number;
  totalQuestions: number;
}

const STATUS_CONFIG = {
  listening: {
    label: "Listening",
    icon: Ear,
    color: "#22d3ee",
  },
  thinking: {
    label: "Thinking",
    icon: Brain,
    color: "#a78bfa",
  },
  speaking: {
    label: "Speaking",
    icon: AudioLines,
    color: "#60a5fa",
  },
} as const;

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function InterviewerPanel({
  status,
  elapsedSeconds,
  questionNumber,
  totalQuestions,
}: InterviewerPanelProps) {
  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;
  const label = config.label;
  const color = config.color;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-400/5" />

      {/* Top meta row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
          <Hash className="h-3 w-3" />
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
          <Clock className="h-3 w-3 text-cyan-300" />
          {formatTime(elapsedSeconds)}
        </div>
      </div>

      {/* Avatar */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <div className="absolute inset-0 rounded-full" />

          <motion.div
            animate={
              status === "thinking"
                ? { rotate: [0, 5, -5, 0] }
                : status === "speaking"
                  ? { scale: [1, 1.04, 1] }
                  : { scale: 1 }
            }
            transition={{
              duration: status === "thinking" ? 2 : 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_45px_rgba(99,102,241,0.45)] sm:h-24 sm:w-24"
          >
            <Bot className="h-9 w-9 text-white sm:h-11 sm:w-11" strokeWidth={1.6} />
          </motion.div>
        </div>

        <p className="mt-5 text-sm font-semibold text-white">AI Interviewer</p>
        <p className="text-xs text-gray-500">Senior Engineering Manager persona</p>

        {/* Status pill */}
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            color: color,
            borderColor: `${color}33`,
            backgroundColor: `${color}1a`,
          }}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {label}
          {status !== "thinking" && (
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
}