// components/home/Hero.tsx
"use client";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle, Brain, MessageSquareText, BarChart3, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

// Static, TypeScript-safe variants (no functions inside the variants object).
// Per-element stagger delay is applied via the `transition` prop on each
// motion component instead of a `custom` callback.
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-32">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#05050a]" />
        <motion.div
          className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-purple-600/30 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-600/25 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[130px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: Text content */}
        <div className="relative z-10 flex flex-col items-start text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, delay: 0, ease: EASE_OUT }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-xs font-medium text-gray-300">
              Powered by Google Gemini AI
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Your Personal{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              AI Study &amp; Interview
            </span>{" "}
            Coach
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            Practice smarter, not harder. StudyMateAI generates dynamic
            questions for any topic or job role, evaluates your written and
            spoken answers in real time, and adapts to your skill level —
            turning every session into measurable progress.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/practice">
  <Button
    size="lg"
    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 px-7 text-base text-white"
  >
    Start Practicing
    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Button>
</Link>
            <Link href="/demo">
  <Button
    size="lg"
    variant="outline"
    className="border-white/15 bg-white/5 px-7 text-base text-white backdrop-blur-sm hover:bg-white/10"
  >
    Watch Demo
  </Button>
</Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
            className="mt-10 flex items-center gap-6 text-sm text-gray-500"
          >
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-white">10K+</span>
              <span>Practice sessions</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-white">96%</span>
              <span>Report improved confidence</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Geometric illustration */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleInVariants}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          className="relative z-10 hidden h-[480px] items-center justify-center lg:flex"
        >
          {/* Core rotating ring */}
          <motion.div
            className="absolute h-72 w-72 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" />
          </motion.div>
          <motion.div
            className="absolute h-96 w-96 rounded-full border border-dashed border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_2px_rgba(192,132,252,0.7)]" />
          </motion.div>

          {/* Center glass panel */}
          <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(129,90,255,0.25)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-400/20" />
            <Brain className="relative h-20 w-20 text-white/90" strokeWidth={1.4} />
          </div>

          {/* Floating cards */}
          <motion.div
            className="absolute left-2 top-10 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-lg"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageSquareText className="h-5 w-5 text-cyan-300" />
            <span className="text-xs font-medium text-gray-200">Live Feedback</span>
          </motion.div>

          <motion.div
            className="absolute bottom-16 left-0 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-lg"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <BarChart3 className="h-5 w-5 text-blue-300" />
            <span className="text-xs font-medium text-gray-200">Adaptive Score</span>
          </motion.div>

          <motion.div
            className="absolute bottom-4 right-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Mic className="h-5 w-5 text-purple-300" />
            <span className="text-xs font-medium text-gray-200">Voice Answer</span>
          </motion.div>

          {/* Floating dots */}
          <motion.span
            className="absolute top-6 right-16 h-2 w-2 rounded-full bg-cyan-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.span
            className="absolute bottom-24 right-24 h-1.5 w-1.5 rounded-full bg-purple-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
          />
        </motion.div>
      </div>
    </section>
  );
}