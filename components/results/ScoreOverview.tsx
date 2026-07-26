// components/results/ScoreOverview.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import {
  MessageSquareText,
  Cpu,
  Puzzle,
  Gauge,
  Users,
  type LucideIcon,
} from "lucide-react";

interface SkillScore {
  label: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
}

const SKILLS: SkillScore[] = [
  {
    label: "Communication",
    value: 91,
    icon: MessageSquareText,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    label: "Technical Knowledge",
    value: 84,
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    label: "Problem Solving",
    value: 88,
    icon: Puzzle,
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    label: "Confidence",
    value: 68,
    icon: Gauge,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    label: "Leadership",
    value: 79,
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScoreOverview() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8"
    >
      <h2 className="text-lg font-semibold text-white">Score Overview</h2>
      <p className="mt-1 text-sm text-gray-400">
        A breakdown of your performance across key interview skills.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {SKILLS.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={skill.label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${skill.gradient}`}
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {skill.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {skill.value}%
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.value}%` }}
                  transition={{
                    duration: 1,
                    delay: 0.15 + index * 0.1,
                    ease: EASE_OUT,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.gradient}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}