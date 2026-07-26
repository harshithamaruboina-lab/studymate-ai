"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Clock, Trash2, LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountSettings() {
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("ist");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:p-8">
        <h2 className="text-lg font-semibold text-white">Account Settings</h2>
        <p className="mt-1 text-sm text-white/50">
          General account preferences.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="language" className="flex items-center text-sm text-white/70">
              <Globe className="mr-1.5 inline h-3.5 w-3.5" />
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-400/50 [&>option]:bg-[#0b0d14] [&>option]:text-white"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="timezone" className="flex items-center text-sm text-white/70">
              <Clock className="mr-1.5 inline h-3.5 w-3.5" />
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-400/50 [&>option]:bg-[#0b0d14] [&>option]:text-white"
            >
              <option value="ist">IST (UTC+5:30)</option>
              <option value="utc">UTC</option>
              <option value="pst">PST (UTC-8)</option>
              <option value="est">EST (UTC-5)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="gap-2 border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <h3 className="font-semibold text-red-300">Danger Zone</h3>
            <p className="mt-1 text-sm text-white/50">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          {!showConfirmDelete ? (
            <Button
              variant="outline"
              onClick={() => setShowConfirmDelete(true)}
              className="gap-2 border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-2"
            >
              <Button
                variant="ghost"
                onClick={() => setShowConfirmDelete(false)}
                className="text-white/60 hover:text-white"
              >
                Cancel
              </Button>
              <Button className="gap-2 bg-red-600 text-white hover:bg-red-700">
                <Trash2 className="h-4 w-4" />
                Confirm Delete
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}