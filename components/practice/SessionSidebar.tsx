// components/practice/SessionSidebar.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { Target, TrendingUp, Gauge, Lightbulb, ListChecks, Timer } from "lucide-react";

interface SessionSidebarProps {
  todayGoal: string;
  goalProgress: number;
  goalTarget: number;
  accuracy: number;
  confidence: number;
  remainingQuestions: number;
  estimatedMinutesLeft: number;
  tips: string[];
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SessionSidebar({
  todayGoal,
  goalProgress,
  goalTarget,
  accuracy,
  confidence,
  remainingQuestions,
  estimatedMinutesLeft,
  tips,
}: SessionSidebarProps) {
  const goalPercent = Math.min((goalProgress / goalTarget) * 100, 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Today's Goal */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.5, delay: 0, ease: EASE_OUT }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <Target className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Today&apos;s Goal
          </h3>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-gray-400">
          {todayGoal}
        </p>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>Progress</span>
            <span>
              {goalProgress} / {goalTarget}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${goalPercent}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Current Accuracy */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
            <TrendingUp className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Current Accuracy
          </h3>
        </div>
        <p className="mt-3 text-3xl font-bold text-white">
          {accuracy}
          <span className="text-lg text-gray-400">%</span>
        </p>
      </motion.div>

      {/* Confidence Meter */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.5, delay: 0.16, ease: EASE_OUT }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-400">
            <Gauge className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Confidence Meter
          </h3>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"
          />
        </div>
        <p className="mt-2 text-[11px] text-gray-500">
          Based on your response consistency
        </p>
      </motion.div>

      {/* Remaining / Time left */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.5, delay: 0.24, ease: EASE_OUT }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
          <ListChecks className="h-4 w-4 text-purple-300" strokeWidth={1.8} />
          <p className="mt-2 text-xl font-bold text-white">
            {remainingQuestions}
          </p>
          <p className="text-[11px] text-gray-500">Remaining</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
          <Timer className="h-4 w-4 text-cyan-300" strokeWidth={1.8} />
          <p className="mt-2 text-xl font-bold text-white">
            {estimatedMinutesLeft}m
          </p>
          <p className="text-[11px] text-gray-500">Est. left</p>
        </div>
      </motion.div>

      {/* Session Tips */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.5, delay: 0.32, ease: EASE_OUT }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-400/10 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Lightbulb className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-semibold text-white">Session Tips</h3>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {tips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs leading-relaxed text-gray-300"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}