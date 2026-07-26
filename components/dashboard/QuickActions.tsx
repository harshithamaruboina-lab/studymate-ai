// components/dashboard/QuickActions.tsx
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Mic,
  Upload,
  BarChart3,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    title: "Start Study Session",
    description: "Practice with AI-generated questions on any topic.",
    href: "/practice",
    icon: BookOpen,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Start AI Interview",
    description: "Simulate a real interview with voice-based Q&A.",
    href: "/interview",
    icon: Mic,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Upload Resume",
    description: "Let AI tailor questions to your experience.",
    href: "/resume",
    icon: Upload,
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    title: "View Analytics",
    description: "Track your growth across every skill dimension.",
    href: "/analytics",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function QuickActions() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {QUICK_ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={action.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.08]`}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>

                <h3 className="relative mt-5 text-base font-semibold text-white">
                  {action.title}
                </h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-gray-400">
                  {action.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}