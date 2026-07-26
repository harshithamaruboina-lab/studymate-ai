// components/home/Features.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  MessageSquareText,
  Mic,
  TrendingUp,
  BarChart3,
  BookOpenCheck,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  glow: string;
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI Question Generation",
    description:
      "Dynamic, context-aware questions generated instantly for any study topic or job role — never the same session twice.",
    gradient: "from-purple-500 to-blue-500",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.25)]",
  },
  {
    icon: MessageSquareText,
    title: "AI Feedback",
    description:
      "Gemini evaluates every answer for correctness, clarity, and depth — with specific strengths, gaps, and missing concepts.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.25)]",
  },
  {
    icon: Mic,
    title: "Voice Interviews",
    description:
      "Speak your answers naturally. Real-time transcription and text-to-speech make practice feel like a real interview.",
    gradient: "from-cyan-400 to-teal-400",
    glow: "shadow-[0_0_30px_rgba(45,212,191,0.25)]",
  },
  {
    icon: TrendingUp,
    title: "Adaptive Learning",
    description:
      "Difficulty adjusts automatically based on your performance, keeping every session challenging but never overwhelming.",
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-[0_0_30px_rgba(217,70,239,0.2)]",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Visualize your growth with skill radar charts, topic mastery breakdowns, and session-over-session trends.",
    gradient: "from-blue-500 to-purple-500",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.25)]",
  },
  {
    icon: BookOpenCheck,
    title: "Personalized Study Plans",
    description:
      "Get curated resources and a prioritized roadmap built from your weak concepts — not generic study advice.",
    gradient: "from-cyan-400 to-blue-500",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.25)]",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#05050a]" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
            Everything you need
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              serious preparation
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg">
            Every feature is designed around one goal: turning practice into
            measurable, provable improvement.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUpVariants}
                transition={{
                  duration: 0.55,
                  delay: (index % 3) * 0.1,
                  ease: EASE_OUT,
                }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]`}
                />

                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} ${feature.glow} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                </div>

                <h3 className="relative mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}