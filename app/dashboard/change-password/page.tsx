"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check } from "lucide-react";
import { PasswordStrength } from "@/components/dashboard/PasswordStrength";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPass !== form.confirm) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Change Password</h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-lg space-y-5 rounded-2xl border border-border bg-card p-6"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Current Password</label>
          <div className="relative">
            <input
              type={show.current ? "text" : "password"}
              value={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.value })}
              required
              className="h-10 w-full rounded-lg border border-input bg-background pr-9 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button type="button" onClick={() => setShow({ ...show, current: !show.current })} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">New Password</label>
          <div className="relative">
            <input
              type={show.newPass ? "text" : "password"}
              value={form.newPass}
              onChange={(e) => setForm({ ...form, newPass: e.target.value })}
              required
              minLength={8}
              className="h-10 w-full rounded-lg border border-input bg-background pr-9 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button type="button" onClick={() => setShow({ ...show, newPass: !show.newPass })} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show.newPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <PasswordStrength password={form.newPass} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Confirm New Password</label>
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
              className={`h-10 w-full rounded-lg border bg-background pr-9 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                form.confirm && form.newPass !== form.confirm ? "border-destructive" : "border-input"
              }`}
            />
            <button type="button" onClick={() => setShow({ ...show, confirm: !show.confirm })} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.confirm && form.newPass !== form.confirm && (
            <p className="mt-1 text-xs text-destructive">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!form.current || !form.newPass || form.newPass !== form.confirm}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saved && <Check className="h-4 w-4" />}
          {saved ? "Updated!" : "Update Password"}
        </button>
      </motion.form>
    </div>
  );
}
