// components/home/HowItWorks.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import {
  ListChecks,
  BrainCircuit,
  Zap,
  LineChart,
  type LucideIcon,
} from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: ListChecks,
    title: "Choose Topic",
    description:
      "Pick from curated study topics and job roles, or type in your own — StudyMateAI adapts to whatever you're preparing for.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Practice with AI",
    description:
      "Answer dynamically generated questions by typing or speaking. Gemini adjusts difficulty as you go, keeping you challenged.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Get Instant Feedback",
    description:
      "Receive structured scoring on correctness, clarity, and depth — with strengths, gaps, and missing concepts called out clearly.",
  },
  {
    number: "04",
    icon: LineChart,
    title: "Track Progress",
    description:
      "Watch your skill radar and topic mastery evolve session over session, with resources targeted at exactly what you need next.",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#050508]" />
        <div className="absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute left-0 bottom-0 h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
            Simple process
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How it{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg">
            From topic to insight in four steps — no setup friction, no
            wasted time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Connector line (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUpVariants}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: EASE_OUT,
                  }}
                  className="relative flex flex-col items-start"
                >
                  {/* Icon node */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a12] shadow-[0_0_25px_rgba(99,102,241,0.15)]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-400/20" />
                    <Icon className="relative h-7 w-7 text-white" strokeWidth={1.6} />
                  </div>

                  <span className="mt-5 text-sm font-semibold tracking-widest text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}