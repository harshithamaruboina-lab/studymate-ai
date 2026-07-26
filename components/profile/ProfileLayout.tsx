"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  SlidersHorizontal,
  Settings,
  Bell,
  ShieldCheck,
} from "lucide-react";

type TabKey =
  | "profile"
  | "preferences"
  | "account"
  | "notifications"
  | "security";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { key: "account", label: "Account", icon: Settings },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: ShieldCheck },
] as const;

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  return (
    <div className="min-h-screen bg-[#05060a] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold">Profile & Settings</h1>
          <p className="mt-2 text-white/60">
            Manage your StudyMateAI account.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            {activeTab === "profile" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60">Name</label>
                    <input
                      className="mt-1 w-full rounded-lg bg-white/10 p-3 outline-none"
                      defaultValue="John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60">Email</label>
                    <input
                      className="mt-1 w-full rounded-lg bg-white/10 p-3 outline-none"
                      defaultValue="john@example.com"
                    />
                  </div>

                  <button className="rounded-lg bg-indigo-600 px-5 py-3 hover:bg-indigo-700">
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {activeTab === "preferences" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
                <p className="text-white/70">
                  Theme, language, and study preferences will appear here.
                </p>
              </>
            )}

            {activeTab === "account" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Account</h2>
                <p className="text-white/70">
                  Manage your account information.
                </p>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                <p className="text-white/70">
                  Configure notification preferences.
                </p>
              </>
            )}

            {activeTab === "security" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Security</h2>
                <p className="text-white/70">
                  Change password and enable two-factor authentication.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}