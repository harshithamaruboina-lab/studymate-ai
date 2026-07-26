"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, FileEdit, Target } from "lucide-react";
import type { ElementType } from "react";

interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon: ElementType;
}

const recommendations: Recommendation[] = [
  {
    title: "Add quantifiable impact metrics",
    description:
      "Include specific numbers and percentages in your experience section, e.g. 'Improved load time by 40%' instead of general statements.",
    priority: "high",
    icon: TrendingUp,
  },
  {
    title: "Include a dedicated skills section",
    description:
      "Add a clearly labeled skills section listing key technologies like Docker, AWS, and CI/CD to improve ATS parsing.",
    priority: "high",
    icon: FileEdit,
  },
  {
    title: "Tailor keywords to the target role",
    description:
      "Mirror phrasing from the job description for tools like GraphQL and System Design to boost keyword match rate.",
    priority: "medium",
    icon: Target,
  },
  {
    title: "Tighten bullet point phrasing",
    description:
      "Shorten longer bullet points to start with strong action verbs for improved readability.",
    priority: "low",
    icon: Sparkles,
  },
];

const priorityConfig = {
  high: {
    label: "High Priority",
    className: "border-red-400/30 bg-red-500/10 text-red-300",
  },
  medium: {
    label: "Medium Priority",
    className: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  },
  low: {
    label: "Low Priority",
    className: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  },
} as const;

export default function AIRecommendations() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">
          AI Recommendations
        </h2>
      </div>

      <p className="mt-1 text-sm text-white/50">
        Actionable suggestions to strengthen your resume.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          const priority = priorityConfig[rec.priority];

          return (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <Icon className="h-5 w-5 text-indigo-400" />
                </div>

                <span
                  className={`rounded-full border px-2 py-1 text-xs ${priority.className}`}
                >
                  {priority.label}
                </span>
              </div>

              <h3 className="mt-4 font-semibold text-white">{rec.title}</h3>

              <p className="mt-2 text-sm text-white/60">
                {rec.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}