"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";

const TOGGLES = [
  { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
  { key: "sms", label: "SMS Notifications", desc: "Get text message updates about your orders" },
  { key: "promotions", label: "Promotions & Offers", desc: "Get notified about sales and special offers" },
  { key: "digest", label: "Weekly Digest", desc: "Receive a weekly summary of your activity" },
] as const;

export default function SettingsPage() {
  const prefs = useDashboardStore((s) => s.notificationPrefs);
  const updatePrefs = useDashboardStore((s) => s.updateNotificationPrefs);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof typeof prefs) => {
    updatePrefs({ [key]: !prefs[key] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Notification Preferences</h3>
        <p className="mb-5 text-xs text-muted-foreground">Choose what notifications you'd like to receive.</p>
        <div className="space-y-4">
          {TOGGLES.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <button
                role="switch"
                aria-checked={prefs[t.key as keyof typeof prefs]}
                onClick={() => handleToggle(t.key as keyof typeof prefs)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  prefs[t.key as keyof typeof prefs] ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    prefs[t.key as keyof typeof prefs] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
        {saved && <p className="mt-3 text-xs text-emerald-600">Preferences saved!</p>}
      </motion.div>
    </div>
  );
}
