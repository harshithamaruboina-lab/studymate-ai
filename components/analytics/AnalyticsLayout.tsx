// components/analytics/AnalyticsLayout.tsx
"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

import PerformanceChart from "./PerformanceChart";
import TopicBreakdown from "./TopicBreakdown";
import StreakCard from "./StreakCard";
import InterviewHistory from "./InterviewHistory";
import AIInsights from "./AIInsights";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AnalyticsLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050a]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_25px_rgba(99,102,241,0.35)]">
            <BarChart3 className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Analytics
            </h1>
            <p className="text-sm text-gray-400">
              Track your growth across every study and interview session.
            </p>
          </div>
        </motion.div>

        {/* Performance chart */}
        <PerformanceChart />

        {/* Topic breakdown + streak */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <TopicBreakdown />
          <StreakCard />
        </div>

        {/* History + insights */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          <InterviewHistory />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}