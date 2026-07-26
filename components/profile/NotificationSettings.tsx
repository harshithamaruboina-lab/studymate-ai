"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone, Calendar, TrendingUp } from "lucide-react";

interface NotificationOption {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  defaultChecked: boolean;
}

const OPTIONS: NotificationOption[] = [
  {
    key: "emailReminders",
    label: "Email Reminders",
    description: "Get reminded about upcoming practice sessions.",
    icon: Mail,
    defaultChecked: true,
  },
  {
    key: "pushNotifications",
    label: "Push Notifications",
    description: "Receive real-time updates on your device.",
    icon: Smartphone,
    defaultChecked: false,
  },
  {
    key: "weeklyDigest",
    label: "Weekly Digest",
    description: "A summary of your performance every week.",
    icon: Calendar,
    defaultChecked: true,
  },
  {
    key: "progressAlerts",
    label: "Progress Alerts",
    description: "Get notified when you hit a new milestone.",
    icon: TrendingUp,
    defaultChecked: true,
  },
];

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

export default function NotificationSettings() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(OPTIONS.map((o) => [o.key, o.defaultChecked]))
  );

  const toggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">
          Notification Settings
        </h2>
      </div>
      <p className="mt-1 text-sm text-white/50">
        Choose what you want to be notified about.
      </p>

      <div className="mt-6 divide-y divide-white/10">
        {OPTIONS.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{option.label}</p>
                  <p className="text-sm text-white/45">{option.description}</p>
                </div>
              </div>
              <ToggleSwitch
                checked={settings[option.key]}
                onChange={() => toggle(option.key)}
                label={option.label}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}