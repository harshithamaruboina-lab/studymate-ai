"use client";

import { motion } from "framer-motion";
import { Tags, Check, X } from "lucide-react";

const MATCHED_KEYWORDS = [
  "React",
  "TypeScript",
  "REST APIs",
  "Git",
  "Agile",
  "Node.js",
  "Problem Solving",
  "CSS",
];

const MISSING_KEYWORDS = [
  "Docker",
  "CI/CD",
  "GraphQL",
  "Unit Testing",
  "AWS",
  "System Design",
];

const MATCH_PERCENTAGE = Math.round(
  (MATCHED_KEYWORDS.length /
    (MATCHED_KEYWORDS.length + MISSING_KEYWORDS.length)) *
    100
);

export default function KeywordAnalysis() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Tags className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">
            Keyword Analysis
          </h2>
        </div>
        <span className="text-sm text-white/50">
          {MATCH_PERCENTAGE}% match against target role
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-medium text-white/80">
              Matched Keywords ({MATCHED_KEYWORDS.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {MATCHED_KEYWORDS.map((keyword, index) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300"
              >
                {keyword}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <X className="h-4 w-4 text-red-400" />
            <h3 className="text-sm font-medium text-white/80">
              Missing Keywords ({MISSING_KEYWORDS.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {MISSING_KEYWORDS.map((keyword, index) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-sm text-red-300"
              >
                {keyword}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}