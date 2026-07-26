// components/analytics/PerformanceChart.tsx
"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface PerformanceDataPoint {
  date: string;
  score: number;
  confidence: number;
}

const PERFORMANCE_DATA: PerformanceDataPoint[] = [
  { date: "Jul 1", score: 62, confidence: 55 },
  { date: "Jul 4", score: 66, confidence: 58 },
  { date: "Jul 7", score: 70, confidence: 60 },
  { date: "Jul 10", score: 68, confidence: 63 },
  { date: "Jul 13", score: 74, confidence: 65 },
  { date: "Jul 16", score: 78, confidence: 68 },
  { date: "Jul 19", score: 81, confidence: 70 },
  { date: "Jul 22", score: 85, confidence: 74 },
  { date: "Jul 25", score: 87, confidence: 76 },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a12]/95 px-3.5 py-2.5 shadow-xl backdrop-blur-xl">
      <p className="mb-1.5 text-xs font-medium text-gray-400">{label}</p>
      {payload.map((item) => (
        <div key={item.name} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-300">{item.name}</span>
          <span className="ml-auto font-semibold text-white">
            {item.value}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Performance Over Time
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Score and confidence trends across your last 9 sessions.
          </p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400 sm:inline-flex">
          <TrendingUp className="h-3.5 w-3.5" />
          +25% this month
        </span>
      </div>

      <div className="mt-6 h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PERFORMANCE_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="confidenceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.35)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.35)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[40, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              name="Score"
              stroke="#a855f7"
              strokeWidth={2.5}
              fill="url(#scoreFill)"
            />
            <Area
              type="monotone"
              dataKey="confidence"
              name="Confidence"
              stroke="#22d3ee"
              strokeWidth={2.5}
              fill="url(#confidenceFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          Score
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          Confidence
        </div>
      </div>
    </motion.div>
  );
}