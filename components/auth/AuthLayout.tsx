// components/auth/AuthLayout.tsx
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Brain, ShieldCheck, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-[#05050a]">
      {/* Global animated background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-purple-600/25 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Left: Form column */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mx-auto w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="mb-10 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(129,90,255,0.5)]">
              <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Study
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                MateAI
              </span>
            </span>
          </Link>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
            {subtitle}
          </p>

          {/* Card wrapper for form */}
          <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] sm:p-8">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-400/5" />
            {children}
          </div>
        </motion.div>
      </div>

      {/* Right: Illustration column (desktop only) */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden border-l border-white/10 lg:flex">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-950/40 via-[#05050a] to-blue-950/30" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          className="relative flex h-[420px] w-[420px] items-center justify-center"
        >
          <motion.div
            className="absolute h-80 w-80 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" />
          </motion.div>
          <motion.div
            className="absolute h-[26rem] w-[26rem] rounded-full border border-dashed border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_2px_rgba(192,132,252,0.7)]" />
          </motion.div>

          <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(129,90,255,0.25)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-400/20" />
            <Brain className="relative h-20 w-20 text-white/90" strokeWidth={1.4} />
          </div>

          <motion.div
            className="absolute left-0 top-8 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-lg"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck className="h-5 w-5 text-cyan-300" />
            <span className="text-xs font-medium text-gray-200">Secure Access</span>
          </motion.div>

          <motion.div
            className="absolute bottom-6 right-0 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-lg"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Zap className="h-5 w-5 text-purple-300" />
            <span className="text-xs font-medium text-gray-200">Adaptive AI</span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 max-w-sm -translate-x-1/2 text-center">
          <p className="text-sm leading-relaxed text-gray-400">
            &quot;StudyMateAI turned my interview prep from guesswork into a
            measurable process.&quot;
          </p>
          <p className="mt-2 text-xs font-medium text-gray-500">
            — Beta user
          </p>
        </div>
      </div>
    </div>
  );
}