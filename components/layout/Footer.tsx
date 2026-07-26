// components/layout/Footer.tsx
"use client";

import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050508]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 lg:px-8 sm:flex-row sm:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Study
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            MateAI
          </span>
        </Link>

        <ul className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-500">
          &copy; {currentYear} StudyMateAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}