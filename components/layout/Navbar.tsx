// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Analytics", href: "/analytics" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(129,90,255,0.5)] transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Study<span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">MateAI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="relative z-[101] hidden items-center gap-3 lg:flex">
         <Link href="/login">
  <Button
  variant="ghost"
  className="relative z-[102] text-gray-200 hover:text-white hover:bg-white/10"
>
    Login
  </Button>
</Link>
          <Link href="/signup">
  <Button
    className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white shadow-lg"
  >
    Get Started
  </Button>
</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-lg p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-black/70 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Link href="/login">
  <Button
    variant="ghost"
    className="w-full justify-center text-gray-200 hover:text-white hover:bg-white/10"
  >
    Login
  </Button>
</Link>
                <Link href="/signup">
  <Button>
    Get Started
  </Button>
</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}