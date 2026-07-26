// components/analytics/TopicBreakdown.tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Layers } from "lucide-react";

interface TopicScore {
  topic: string;
  score: number;
  sessions: number;
}

const TOPIC_DATA: TopicScore[] = [
  { topic: "System Design", score: 76, sessions: 9 },
  { topic: "JavaScript", score: 88, sessions: 14 },
  { topic: "Data Structures", score: 71, sessions: 11 },
  { topic: "Behavioral", score: 90, sessions: 8 },
  { topic: "API Design", score: 82, sessions: 6 },
  { topic: "Databases", score: 65, sessions: 5 },
];

function getBarColor(score: number): string {
  if (score >= 85) return "#22d3ee";
  if (score >= 70) return "#a855f7";
  return "#fbbf24";
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface TooltipPayloadItem {
  payload: TopicScore;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a12]/95 px-3.5 py-2.5 shadow-xl backdrop-blur-xl">
      <p className="text-xs font-medium text-white">{data.topic}</p>
      <p className="mt-1 text-xs text-gray-400">
        Score: <span className="font-semibold text-white">{data.score}%</span>
      </p>
      <p className="text-xs text-gray-400">
        Sessions: <span className="font-semibold text-white">{data.sessions}</span>
      </p>
    </div>
  );
}

export default function TopicBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
          <Layers className="h-4.5 w-4.5 text-white" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Topic Mastery</h2>
          <p className="text-sm text-gray-400">
            Average score by topic across all sessions.
          </p>
        </div>
      </div>

      <div className="mt-6 h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={TOPIC_DATA}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="rgba(255,255,255,0.35)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="topic"
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={18}>
              {TOPIC_DATA.map((entry) => (
                <Cell key={entry.topic} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}