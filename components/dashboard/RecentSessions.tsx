// components/dashboard/RecentSessions.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { Clock, Calendar, CheckCircle2, CircleDashed, XCircle } from "lucide-react";

type SessionStatus = "Completed" | "In Progress" | "Missed";

interface Session {
  id: string;
  topic: string;
  score: number | null;
  date: string;
  duration: string;
  status: SessionStatus;
}

const RECENT_SESSIONS: Session[] = [
  {
    id: "s1",
    topic: "System Design Fundamentals",
    score: 92,
    date: "Jul 24, 2026",
    duration: "28 min",
    status: "Completed",
  },
  {
    id: "s2",
    topic: "React & Frontend Architecture",
    score: 81,
    date: "Jul 23, 2026",
    duration: "35 min",
    status: "Completed",
  },
  {
    id: "s3",
    topic: "Behavioral Interview Practice",
    score: null,
    date: "Jul 23, 2026",
    duration: "12 min",
    status: "In Progress",
  },
  {
    id: "s4",
    topic: "Data Structures & Algorithms",
    score: 74,
    date: "Jul 21, 2026",
    duration: "42 min",
    status: "Completed",
  },
  {
    id: "s5",
    topic: "Product Management Case Study",
    score: null,
    date: "Jul 19, 2026",
    duration: "0 min",
    status: "Missed",
  },
];

const STATUS_STYLES: Record<
  SessionStatus,
  { className: string; icon: typeof CheckCircle2 }
> = {
  Completed: {
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    icon: CheckCircle2,
  },
  "In Progress": {
    className: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    icon: CircleDashed,
  },
  Missed: {
    className: "border-red-400/20 bg-red-400/10 text-red-400",
    icon: XCircle,
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RecentSessions() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">Recent Sessions</h2>
        <button className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300">
          View all
        </button>
      </div>

      {/* Desktop table header */}
      <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 pb-2 pt-4 text-xs font-medium uppercase tracking-wider text-gray-500 md:grid">
        <span>Topic</span>
        <span>Score</span>
        <span>Date</span>
        <span>Duration</span>
        <span>Status</span>
      </div>

      <div className="divide-y divide-white/5">
        {RECENT_SESSIONS.map((session, index) => {
          const statusInfo = STATUS_STYLES[session.status];
          const StatusIcon = statusInfo.icon;

          return (
            <motion.div
              key={session.id}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
              className="group grid grid-cols-1 gap-3 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.03] md:grid-cols-[2fr_1fr_1fr_1fr_1fr] md:items-center md:gap-4"
            >
              {/* Topic */}
              <div>
                <p className="text-sm font-medium text-white">{session.topic}</p>
              </div>

              {/* Score */}
              <div className="flex items-center gap-2 md:block">
                <span className="text-xs font-medium text-gray-500 md:hidden">
                  Score:
                </span>
                <span
                  className={`text-sm font-semibold ${
                    session.score === null
                      ? "text-gray-500"
                      : session.score >= 85
                        ? "text-emerald-400"
                        : session.score >= 70
                          ? "text-cyan-300"
                          : "text-amber-400"
                  }`}
                >
                  {session.score !== null ? `${session.score}%` : "—"}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Calendar className="h-3.5 w-3.5 text-gray-600 md:hidden" />
                {session.date}
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Clock className="h-3.5 w-3.5 text-gray-600 md:hidden" />
                {session.duration}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {session.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}