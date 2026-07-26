// components/dashboard/TopNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function TopNavbar() {
  const [searchValue, setSearchValue] = useState("");
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setDisplayName(user?.displayName || "User");
    });

    return () => unsubscribe();
  }, []);

  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05050a]/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 py-4 pl-16 lg:pl-6">
        {/* Welcome message */}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
            Welcome back, {displayName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block">
            Here&apos;s what&apos;s happening with your prep today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search topics, sessions..."
              className="w-52 rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:w-64 focus:border-purple-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/20 lg:w-64"
            />
          </div>

          {/* Notification button */}
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
          </button>

          {/* User avatar */}
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-2.5 transition-colors duration-200 hover:bg-white/10">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 text-xs font-semibold text-white">
              {avatarInitial}
            </div>
            <span className="hidden text-sm font-medium text-gray-200 sm:block">
              {displayName}
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-gray-500 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}