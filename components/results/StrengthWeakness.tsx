"use client";

import StrengthWeakness from "@/components/results/StrengthWeakness";

export default function ResultsLayout() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1>Testing StrengthWeakness</h1>
      <StrengthWeakness />
    </div>
  );
}