// components/analytics/StreakCard.tsx
"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, Target } from "lucide-react";

interface DayActivity {
  day: string;
  active: boolean;
}

const WEEK_ACTIVITY: DayActivity[] = [
  { day: "M", active: true },
  { day: "T", active: true },
  { day: "W", active: true },
  { day: "T", active: false },
  { day: "F", active: true },
  { day: "S", active: true },
  { day: "S", active: true },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function StreakCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-cyan-400/5 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-[0_0_25px_rgba(251,146,60,0.3)]">
          <Flame className="h-4.5 w-4.5 text-white" strokeWidth={1.8} />
        </div>
        <h2 className="text-lg font-semibold text-white">Study Streak</h2>
      </div>

      <div className="mt-5 flex items-end gap-3">
        <span className="text-5xl font-bold text-white">12</span>
        <span className="mb-1.5 text-sm text-gray-400">days in a row</span>
      </div>

      {/* Week activity dots */}
      <div className="mt-6 flex items-center justify-between">
        {WEEK_ACTIVITY.map((item, index) => (
          <div key={`${item.day}-${index}`} className="flex flex-col items-center gap-1.5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                item.active
                  ? "bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-[0_0_15px_rgba(251,146,60,0.4)]"
                  : "border border-white/10 bg-white/5 text-gray-600"
              }`}
            >
              {item.active && <Flame className="h-3.5 w-3.5" strokeWidth={2} />}
            </motion.div>
            <span className="text-[10px] text-gray-500">{item.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
        <div className="flex items-center gap-2.5">
          <Trophy className="h-4 w-4 text-amber-400" strokeWidth={1.8} />
          <div>
            <p className="text-sm font-semibold text-white">21 days</p>
            <p className="text-[11px] text-gray-500">Personal best</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Target className="h-4 w-4 text-cyan-300" strokeWidth={1.8} />
          <div>
            <p className="text-sm font-semibold text-white">5 / 7</p>
            <p className="text-[11px] text-gray-500">Weekly goal</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}