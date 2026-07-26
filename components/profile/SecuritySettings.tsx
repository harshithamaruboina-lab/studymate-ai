"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        aria-label={label}
      />
      <div className="h-6 w-11 rounded-full bg-white/10 border border-white/10 transition-colors peer-checked:bg-indigo-500 peer-checked:border-indigo-400/50" />
      <div className="absolute left-1 h-4 w-4 rounded-full bg-white/70 transition-transform peer-checked:translate-x-5 peer-checked:bg-white" />
    </label>
  );
}

export default function SecuritySettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleUpdate = () => {
    setIsSaved(true);
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setIsSaved(false), 2000);
  };

  const passwordsMismatch =
    passwords.next.length > 0 &&
    passwords.confirm.length > 0 &&
    passwords.next !== passwords.confirm;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Change Password</h2>
        </div>
        <p className="mt-1 text-sm text-white/50">
          Use a strong password you don&apos;t use elsewhere.
        </p>

        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm text-white/70">
              Current Password
            </label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => handleChange("current", e.target.value)}
                className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/30"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                aria-label="Toggle password visibility"
              >
                {showCurrent ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm text-white/70">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={passwords.next}
                  onChange={(e) => handleChange("next", e.target.value)}
                  className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/30"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label="Toggle password visibility"
                >
                  {showNew ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-white/70">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => handleChange("confirm", e.target.value)}
                  className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/30"
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label="Toggle password visibility"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {passwordsMismatch && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              Passwords do not match.
            </motion.p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleUpdate}
            disabled={
              !passwords.current ||
              !passwords.next ||
              !passwords.confirm ||
              passwordsMismatch
            }
            className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-40"
          >
            <Save className="h-4 w-4" />
            {isSaved ? "Password Updated!" : "Update Password"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="h-4 w-4 text-white/70" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-white/45">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled((prev) => !prev)}
            label="Two-Factor Authentication"
          />
        </div>
      </div>
    </div>
  );
}