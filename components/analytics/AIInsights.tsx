// components/analytics/AIInsights.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

interface Insight {
  title: string;
  description: string;
  icon: typeof TrendingUp;
  color: string;
}

const INSIGHTS: Insight[] = [
  {
    title: "Consistent Improvement",
    description:
      "Your average score has climbed 25% over the past month, with the sharpest gains in behavioral and JavaScript topics.",
    icon: TrendingUp,
    color: "#22d3ee",
  },
  {
    title: "Watch: Database Design",
    description:
      "Database Design scores are trailing your other topics at 65%. Consider scheduling two focused sessions this week.",
    icon: AlertCircle,
    color: "#fbbf24",
  },
  {
    title: "Recommended Focus",
    description:
      "Based on recent sessions, practicing concise answers under time pressure would likely raise your confidence score fastest.",
    icon: Lightbulb,
    color: "#a78bfa",
  },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-400/5" />

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_25px_rgba(99,102,241,0.35)]">
          <Sparkles className="h-5 w-5 text-white" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">AI Insights</h2>
          <p className="text-xs text-gray-500">Generated from your recent activity</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {INSIGHTS.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.08, ease: EASE_OUT }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${insight.color}1a` }}
              >
                <Icon className="h-4 w-4" style={{ color: insight.color }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{insight.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}