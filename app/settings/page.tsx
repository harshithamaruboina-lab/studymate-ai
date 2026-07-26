"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, SlidersHorizontal, Bell, ShieldCheck } from "lucide-react";
import UserProfileCard from "@/components/profile/UserProfileCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import AccountSettings from "@/components/profile/AccountSettings";
import NotificationSettings from "@/components/profile/NotificationSettings";
import SecuritySettings from "@/components/profile/SecuritySettings";

type TabKey = "profile" | "account" | "notifications" | "security";

interface TabItem {
  key: TabKey;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "account", label: "Account", icon: SlidersHorizontal },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: ShieldCheck },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfileCard />;
      case "account":
        return (
          <div className="space-y-6">
            <PreferencesCard />
            <AccountSettings />
          </div>
        );
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#05060a] bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent_60%)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Manage your profile, account, notifications, and security.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:w-64 lg:shrink-0"
          >
            <nav className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors lg:w-full ${
                        isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="settings-tab-highlight"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-white/10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <Icon className="relative z-10 h-4 w-4" />
                      <span className="relative z-10 whitespace-nowrap">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </motion.aside>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}