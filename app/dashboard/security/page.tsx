"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone, Globe, Clock, CheckCircle } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";

export default function SecurityPage() {
  const sessions = useDashboardStore((s) => s.loginSessions);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Security</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-1 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Two-Factor Authentication</h3>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
        <button className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Enable 2FA
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-1 flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Active Sessions</h3>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">Devices where you're currently logged in.</p>
        <div className="space-y-3">
          {sessions.map((s, i) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  {s.device.toLowerCase().includes("iphone") || s.device.toLowerCase().includes("ipad") ? (
                    <Smartphone className="h-4 w-4 text-primary" />
                  ) : (
                    <Globe className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {s.browser} on {s.device}
                    {s.isCurrent && <span className="ml-2 text-xs text-emerald-600">Current session</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-muted-foreground">
                    <Clock className="-mt-0.5 mr-0.5 inline h-3 w-3" />
                    {new Date(s.date).toLocaleDateString()}
                  </p>
                </div>
                {s.isCurrent ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <button className="rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-1 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Login History</h3>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">Recent login activity on your account.</p>
        <div className="space-y-2">
          {[...sessions].reverse().map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-sm text-foreground">{s.location}</span>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(s.date).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
