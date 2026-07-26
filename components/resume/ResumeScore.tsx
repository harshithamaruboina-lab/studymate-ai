"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

const SCORE = 78;
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BREAKDOWN = [
  { label: "Formatting", value: 85 },
  { label: "Content Quality", value: 74 },
  { label: "Impact & Metrics", value: 68 },
  { label: "Clarity", value: 82 },
];

function getScoreColor(score: number) {
  if (score >= 80) return "#4ade80";
  if (score >= 60) return "#facc15";
  return "#f87171";
}

export default function ResumeScore() {
  const color = getScoreColor(SCORE);
  const offset = CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex items-center gap-2">
        <Gauge className="h-5 w-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Resume Score</h2>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="12"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{SCORE}</span>
            <span className="text-xs text-white/50">out of 100</span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-4">
          {BREAKDOWN.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">{item.label}</span>
                <span className="text-white/50">{item.value}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}