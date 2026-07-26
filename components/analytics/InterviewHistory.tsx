// components/analytics/InterviewHistory.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, CircleDashed } from "lucide-react";

type SessionStatus = "Completed" | "In Progress";

interface InterviewRecord {
  id: string;
  role: string;
  score: number | null;
  date: string;
  duration: string;
  status: SessionStatus;
}

const INTERVIEW_HISTORY: InterviewRecord[] = [
  {
    id: "ih1",
    role: "Senior Frontend Engineer",
    score: 88,
    date: "Jul 24, 2026",
    duration: "32 min",
    status: "Completed",
  },
  {
    id: "ih2",
    role: "Backend Engineer — Node.js",
    score: 79,
    date: "Jul 21, 2026",
    duration: "40 min",
    status: "Completed",
  },
  {
    id: "ih3",
    role: "Product Manager",
    score: null,
    date: "Jul 19, 2026",
    duration: "15 min",
    status: "In Progress",
  },
  {
    id: "ih4",
    role: "Full Stack Developer",
    score: 91,
    date: "Jul 15, 2026",
    duration: "38 min",
    status: "Completed",
  },
];

const STATUS_META = {
  Completed: {
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    icon: CheckCircle2,
  },
  "In Progress": {
    className: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    icon: CircleDashed,
  },
} as const;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function InterviewHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.24, ease: EASE_OUT }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-lg font-semibold text-white">Interview History</h2>
        <p className="mt-1 text-sm text-gray-400">
          Your most recent AI mock interview sessions.
        </p>
      </div>

      <div className="divide-y divide-white/5">
        {INTERVIEW_HISTORY.map((record, index) => {
          const statusMeta = STATUS_META[record.status];
          const StatusIcon = statusMeta.icon;

          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.06, ease: EASE_OUT }}
              className="flex flex-col gap-3 px-6 py-4 transition-colors duration-200 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {record.role}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {record.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {record.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-semibold ${
                    record.score === null
                      ? "text-gray-500"
                      : record.score >= 85
                        ? "text-emerald-400"
                        : record.score >= 70
                          ? "text-cyan-300"
                          : "text-amber-400"
                  }`}
                >
                  {record.score !== null ? `${record.score}%` : "—"}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusMeta.className}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {record.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}