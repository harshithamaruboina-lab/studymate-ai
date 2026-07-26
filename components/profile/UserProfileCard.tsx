// components/profile/UserProfileCard.tsx
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Camera, Mail, Briefcase, GraduationCap, FileText, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileFormData {
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  bio: string;
}

const DEFAULT_FORM_DATA: ProfileFormData = {
  name: "User",
  email: "No email available",
  targetRole: "Frontend Engineer",
  experienceLevel: "intermediate",
  bio: "Aspiring software engineer passionate about building sleek, user-friendly web apps. Currently prepping for SDE interviews.",
};

export default function UserProfileCard() {
  const [formData, setFormData] = useState<ProfileFormData>(DEFAULT_FORM_DATA);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFormData((prev) => ({
        ...prev,
        name: user?.displayName || "User",
        email: user?.email || "No email available",
      }));
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const avatarInitials = formData.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex flex-col items-center gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-semibold text-white shadow-lg">
            {avatarInitials}
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-md transition-colors hover:text-white"
            aria-label="Change avatar"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-white">{formData.name}</h2>
          <p className="text-sm text-white/50">{formData.targetRole}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center text-sm text-white/70">
            <User className="mr-1.5 inline h-3.5 w-3.5" />
            Full Name
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center text-sm text-white/70">
            <Mail className="mr-1.5 inline h-3.5 w-3.5" />
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="targetRole" className="flex items-center text-sm text-white/70">
            <Briefcase className="mr-1.5 inline h-3.5 w-3.5" />
            Target Role
          </label>
          <Input
            id="targetRole"
            value={formData.targetRole}
            onChange={(e) => handleChange("targetRole", e.target.value)}
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="experienceLevel" className="flex items-center text-sm text-white/70">
            <GraduationCap className="mr-1.5 inline h-3.5 w-3.5" />
            Experience Level
          </label>
          <select
            id="experienceLevel"
            value={formData.experienceLevel}
            onChange={(e) => handleChange("experienceLevel", e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-400/50 [&>option]:bg-[#0b0d14] [&>option]:text-white"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="bio" className="flex items-center text-sm text-white/70">
            <FileText className="mr-1.5 inline h-3.5 w-3.5" />
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-indigo-400/50"
          />
        </div>
      </div>

      <motion.div className="mt-6 flex justify-end" initial={false}>
        <Button
          onClick={handleSave}
          className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"
        >
          <Save className="h-4 w-4" />
          {isSaved ? "Saved!" : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
}