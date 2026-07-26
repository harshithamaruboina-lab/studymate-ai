// components/dashboard/AIRecommendations.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { AlertTriangle, Target, BookMarked, Lightbulb, ArrowRight } from "lucide-react";

const WEAK_TOPICS: string[] = [
  "System Design Trade-offs",
  "Dynamic Programming",
  "Behavioral STAR Method",
];

const RESOURCES: { title: string; type: string }[] = [
  { title: "Designing Data-Intensive Applications", type: "Book" },
  { title: "Grokking the System Design Interview", type: "Course" },
  { title: "The STAR Method Explained", type: "Article" },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AIRecommendations() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">
        AI Recommendations
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Weak Topics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ duration: 0.5, delay: 0, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/80 to-orange-500/80 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
            <AlertTriangle className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-white">
            Weak Topics
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {WEAK_TOPICS.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-[11px] font-medium text-red-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Today's Goal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_25px_rgba(99,102,241,0.25)]">
            <Target className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-white">
            Today&apos;s Goal
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            Complete 3 practice questions on Dynamic Programming.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>Progress</span>
              <span>2 / 3</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "66%" }}
                transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Recommended Resources */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.25)]">
            <BookMarked className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-white">
            Recommended Resources
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {RESOURCES.map((resource) => (
              <li key={resource.title}>
                <button className="group flex w-full items-center justify-between gap-2 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/5">
                  <span className="text-xs text-gray-300 group-hover:text-white">
                    {resource.title}
                    <span className="ml-1.5 text-[10px] text-gray-500">
                      · {resource.type}
                    </span>
                  </span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-gray-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Interview Tip of the Day */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ duration: 0.5, delay: 0.24, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-400/10 p-5 backdrop-blur-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_25px_rgba(217,70,239,0.2)]">
            <Lightbulb className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-white">
            Interview Tip of the Day
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-gray-300">
            Structure behavioral answers with the STAR method — Situation,
            Task, Action, Result — to keep responses concise and outcome
            focused.
          </p>
        </motion.div>
      </div>
    </div>
  );
}