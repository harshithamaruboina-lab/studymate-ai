"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const ATS_SCORE = 82;

interface ATSCheckItem {
  label: string;
  status: "pass" | "fail" | "warning";
}

const checks: ATSCheckItem[] = [
  {
    label: "Standard section headings used",
    status: "pass",
  },
  {
    label: "No tables or columns detected",
    status: "pass",
  },
  {
    label: "Contact information correctly parsed",
    status: "pass",
  },
  {
    label: "ATS-friendly file format",
    status: "pass",
  },
  {
    label: "Some graphics may not parse correctly",
    status: "warning",
  },
  {
    label: "Missing a dedicated Skills section",
    status: "fail",
  },
];

const statusConfig: Record<
  ATSCheckItem["status"],
  {
    icon: React.ElementType;
    color: string;
    bg: string;
  }
> = {
  pass: {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  warning: {
    icon: AlertCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  fail: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
};

export default function ATSAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="h-7 w-7 text-cyan-400" />
        <div>
          <h2 className="text-xl font-bold text-white">
            ATS Compatibility
          </h2>
          <p className="text-sm text-slate-400">
            Applicant Tracking System Analysis
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 font-medium">
            ATS Score
          </span>
          <span className="text-2xl font-bold text-cyan-400">
            {ATS_SCORE}%
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ATS_SCORE}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-cyan-500 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-3">
        {checks.map((item) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;

          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-xl p-3 ${config.bg}`}
            >
              <Icon className={`h-5 w-5 ${config.color}`} />
              <span className="text-slate-200">{item.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}