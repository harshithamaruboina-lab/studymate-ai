// components/auth/LoginForm.tsx
"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    alert("Google login successful!");

    router.push("/dashboard");
  } catch (error: any) {
    alert(error.message);
  }
};
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login successful!");

    router.push("/dashboard");
  } catch (error: any) {
    switch (error.code) {
      case "auth/user-not-found":
        alert("No account found with this email.");
        break;

      case "auth/wrong-password":
        alert("Incorrect password.");
        break;

      case "auth/invalid-email":
        alert("Please enter a valid email.");
        break;

      case "auth/invalid-credential":
        alert("Invalid email or password.");
        break;

      case "auth/too-many-requests":
        alert("Too many failed attempts. Please try again later.");
        break;

      default:
        alert(error.message);
    }
  }
};
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-purple-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-purple-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-500/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <label className="flex cursor-pointer items-center gap-2.5 select-none">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="peer sr-only"
        />
        <span className="flex h-4 w-4 items-center justify-center rounded border border-white/20 bg-white/5 transition-all duration-200 peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-purple-500 peer-checked:to-cyan-400">
          {rememberMe && (
            <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-white stroke-[2]">
              <path d="M2 6l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="text-sm text-gray-400">Remember me</span>
      </label>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="group relative mt-1 w-full overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-base text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(59,130,246,0.6)]"
      >
        Login
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Or
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Google */}
      <motion.button
  type="button"
  onClick={handleGoogleLogin}
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.99 }}
  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium"
>
  <Globe className="h-4 w-4" />
  Continue with Google
</motion.button>

      {/* Bottom text */}
      <p className="mt-2 text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text hover:opacity-80"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}