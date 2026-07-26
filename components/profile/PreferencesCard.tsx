"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Target, BookOpen, Check } from "lucide-react";

const TOPIC_OPTIONS = [
  "Data Structures",
  "Algorithms",
  "System Design",
  "React",
  "Databases",
  "Behavioral",
  "Operating Systems",
  "Networking",
];

export default function PreferencesCard() {
  const [theme, setTheme] = useState("dark");
  const [difficulty, setDifficulty] = useState("medium");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Data Structures",
    "System Design",
    "React",
  ]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
      <h2 className="text-lg font-semibold text-white">Preferences</h2>
      <p className="mt-1 text-sm text-white/50">
        Customize how StudyMateAI works for you.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="theme" className="flex items-center text-sm text-white/70">
            <Palette className="mr-1.5 inline h-3.5 w-3.5" />
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-400/50 [&>option]:bg-[#0b0d14] [&>option]:text-white"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="difficulty" className="flex items-center text-sm text-white/70">
            <Target className="mr-1.5 inline h-3.5 w-3.5" />
            Interview Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-400/50 [&>option]:bg-[#0b0d14] [&>option]:text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex items-center text-sm text-white/70">
          <BookOpen className="mr-1.5 inline h-3.5 w-3.5" />
          Preferred Topics
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPIC_OPTIONS.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <motion.button
                key={topic}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTopic(topic)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  isSelected
                    ? "border-indigo-400/40 bg-indigo-500/20 text-white"
                    : "border-white/10 bg-white/5 text-white/50 hover:text-white/80"
                }`}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
                {topic}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}