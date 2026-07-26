// components/interview/ConfidenceMeter.tsx
"use client";

import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  score: number; // 0 - 100
  size?: number;
}

function getConfidenceLevel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "High Confidence", color: "#22d3ee" };
  if (score >= 55) return { label: "Moderate Confidence", color: "#a78bfa" };
  return { label: "Building Confidence", color: "#fbbf24" };
}

export default function ConfidenceMeter({
  score,
  size = 140,
}: ConfidenceMeterProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const { label, color } = getConfidenceLevel(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
          <span className="text-[10px] text-gray-500">/ 100</span>
        </div>
      </div>
      <span
        className="mt-3 rounded-full border px-3 py-1 text-xs font-medium"
        style={{
          color,
          borderColor: `${color}33`,
          backgroundColor: `${color}1a`,
        }}
      >
        {label}
      </span>
    </div>
  );
}