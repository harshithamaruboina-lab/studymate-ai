// components/dashboard/StatsCards.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, animate, type Variants } from "framer-motion";
import { BookOpen, Trophy, Flame, Brain, type LucideIcon, TrendingUp } from "lucide-react";

interface StatCard {
  label: string;
  value: number;
  suffix: string;
  trend: string;
  icon: LucideIcon;
  gradient: string;
}

const STATS: StatCard[] = [
  {
    label: "Practice Sessions",
    value: 42,
    suffix: "",
    trend: "+8 this week",
    icon: BookOpen,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    label: "Interview Score",
    value: 87,
    suffix: "%",
    trend: "+5% vs last week",
    icon: Trophy,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    label: "Study Streak",
    value: 12,
    suffix: " days",
    trend: "Personal best",
    icon: Flame,
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    label: "AI Readiness Score",
    value: 78,
    suffix: "/100",
    trend: "+3 pts today",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useCountUp(target: number, duration = 1.4) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [target, duration]);

  return value;
}

function StatCardItem({ stat, index }: { stat: StatCard; index: number }) {
  const count = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-[0_0_25px_rgba(99,102,241,0.25)]`}
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
          <TrendingUp className="h-3 w-3" />
          {stat.trend}
        </span>
      </div>

      <p className="relative mt-5 text-3xl font-bold tracking-tight text-white">
        {count}
        <span className="text-xl text-gray-400">{stat.suffix}</span>
      </p>
      <p className="relative mt-1 text-sm text-gray-400">{stat.label}</p>
    </motion.div>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat, index) => (
        <StatCardItem key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}