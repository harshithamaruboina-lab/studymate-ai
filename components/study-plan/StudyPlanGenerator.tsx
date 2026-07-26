"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CalendarDays, Clock, Target } from "lucide-react";

interface StudyItem {
  day: number;
  topic: string;
  tasks: string[];
}

interface StudyPlan {
  title: string;
  overview: string;
  schedule: StudyItem[];
}

export default function StudyPlanGenerator() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [days, setDays] = useState(30);
  const [hoursPerDay, setHoursPerDay] = useState(2);

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const response = await fetch("/api/ai/study-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          level,
          days,
          hoursPerDay,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await response.json();

      setPlan(data);
    } catch (error) {
      console.error(error);
      setError("Unable to generate study plan. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-indigo-400" />
        <h2 className="text-xl font-semibold text-white">
          AI Study Plan Generator
        </h2>
      </div>

      <p className="mt-2 text-sm text-white/50">
        Create a personalized learning roadmap based on your goal and timeline.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Your goal (e.g. React Developer)"
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-white"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
          <CalendarDays className="h-4 w-4 text-indigo-400" />
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full bg-transparent text-white outline-none"
          />
          <span className="text-white/40 text-sm">days</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
          <Clock className="h-4 w-4 text-indigo-400" />
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full bg-transparent text-white outline-none"
          />
          <span className="text-white/40 text-sm">hrs/day</span>
        </div>
      </div>

      <button
        onClick={generatePlan}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white disabled:opacity-50"
      >
        <Target className="h-4 w-4" />
        {loading ? "Generating..." : "Generate AI Plan"}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {plan && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {plan.title}
          </h3>

          <p className="text-sm text-white/60">
            {plan.overview}
          </p>

          {plan.schedule?.map((item) => (
            <div
              key={item.day}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h4 className="font-medium text-white">
                Day {item.day}: {item.topic}
              </h4>

              <ul className="mt-2 list-disc pl-5 text-sm text-white/60">
                {item.tasks.map((task, index) => (
                  <li key={index}>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}