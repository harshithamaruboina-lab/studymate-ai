// components/auth/SignupForm.tsx
"use client";
import { createUserProfile } from "@/lib/firestore/createUserProfile";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserProfile({
  uid: userCredential.user.uid,
  fullName: fullName,
  email: userCredential.user.email ?? email,
});

    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    alert("Account created successfully!");

    router.push("/dashboard");
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        alert("An account with this email already exists.");
        break;
      case "auth/invalid-email":
        alert("Please enter a valid email.");
        break;
      case "auth/weak-password":
        alert("Password must be at least 6 characters.");
        break;
      default:
        alert(error.message);
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
          Full Name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="fullName"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-purple-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

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
        <label htmlFor="password" className="text-sm font-medium text-gray-300">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
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

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full rounded-xl border bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:bg-white/[0.07] focus:ring-2 ${
              passwordsMismatch
                ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                : "border-white/10 focus:border-purple-400/50 focus:ring-purple-500/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {passwordsMismatch && (
          <span className="text-xs text-red-400">Passwords do not match</span>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="group relative mt-1 w-full overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-base text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(59,130,246,0.6)]"
      >
        Create Account
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
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
      >
        <Globe className="h-4 w-4" />
        Sign up with Google
      </motion.button>

      {/* Bottom text */}
      <p className="mt-2 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text hover:opacity-80"
        >
          Login
        </Link>
      </p>
    </form>
  );
}