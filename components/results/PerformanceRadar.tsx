// components/results/PerformanceRadar.tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface RadarAxis {
  label: string;
  value: number; // 0 - 100
}

const AXES: RadarAxis[] = [
  { label: "Communication", value: 91 },
  { label: "Coding", value: 82 },
  { label: "Problem Solving", value: 88 },
  { label: "System Design", value: 75 },
  { label: "Behavioral", value: 90 },
  { label: "Confidence", value: 68 },
];

const SIZE = 320;
const CENTER = SIZE / 2;
const MAX_RADIUS = 110;
const LEVELS = 4;

function getPoint(angle: number, radius: number): { x: number; y: number } {
  const x = CENTER + radius * Math.cos(angle);
  const y = CENTER + radius * Math.sin(angle);
  return { x, y };
}

export default function PerformanceRadar() {
  const angleStep = (Math.PI * 2) / AXES.length;

  const gridLevels = useMemo(() => {
    return Array.from({ length: LEVELS }, (_, levelIndex) => {
      const radius = (MAX_RADIUS / LEVELS) * (levelIndex + 1);
      const points = AXES.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return getPoint(angle, radius);
      });
      return points.map((p) => `${p.x},${p.y}`).join(" ");
    });
  }, [angleStep]);

  const axisLines = useMemo(() => {
    return AXES.map((_, i) => {
      const angle = angleStep * i - Math.PI / 2;
      return getPoint(angle, MAX_RADIUS);
    });
  }, [angleStep]);

  const dataPoints = useMemo(() => {
    return AXES.map((axis, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const radius = (axis.value / 100) * MAX_RADIUS;
      return getPoint(angle, radius);
    });
  }, [angleStep]);

  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const labelPositions = useMemo(() => {
    return AXES.map((axis, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const point = getPoint(angle, MAX_RADIUS + 28);
      return { ...point, label: axis.label };
    });
  }, [angleStep]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8">
      <h2 className="text-lg font-semibold text-white">Performance Radar</h2>
      <p className="mt-1 text-sm text-gray-400">
        Your skill distribution across every dimension we track.
      </p>

      <div className="mt-6 flex justify-center">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE + 20}`}
          width="100%"
          height="auto"
          className="max-w-sm"
        >
          {/* Grid levels */}
          {gridLevels.map((points, i) => (
            <polygon
              key={`grid-${i}`}
              points={points}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((point, i) => (
            <line
              key={`axis-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          ))}

          {/* Gradient fill definition */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* Animated data polygon */}
          <motion.polygon
            points={dataPolygon}
            fill="url(#radarGradient)"
            fillOpacity={0.25}
            stroke="url(#radarGradient)"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill="#22d3ee"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))" }}
            />
          ))}

          {/* Labels */}
          {labelPositions.map((pos, i) => (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fill="#9ca3af"
              fontWeight={500}
            >
              {pos.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}