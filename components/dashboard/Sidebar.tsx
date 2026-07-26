// components/dashboard/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Mic,
  BarChart3,
  GraduationCap,
  FileText,
  Settings,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Practice", href: "/practice", icon: BookOpen },
  { label: "AI Interview", href: "/interview", icon: Mic },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Study Plan", href: "/study-plan", icon: GraduationCap },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r border-white/10 bg-white/[0.02] backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(129,90,255,0.5)]">
          <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">
          Study
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            MateAI
          </span>
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-highlight"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/25 via-blue-600/20 to-cyan-500/15 border border-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <div
                className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] ${
                    isActive ? "text-cyan-300" : "text-gray-500"
                  }`}
                  strokeWidth={1.8}
                />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom AI readiness teaser */}
      <div className="m-4 rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-400/10 p-4">
        <p className="text-xs font-semibold text-white">AI Readiness Score</p>
        <p className="mt-1 text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          78%
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
          Keep practicing to boost your score.
        </p>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger trigger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-white backdrop-blur-xl lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close sidebar"
                  className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}