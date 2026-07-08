"use client";

import { motion } from "framer-motion";
import { RotateCcw, Shield, RefreshCw } from "lucide-react";

export function ReturnPolicy() {
  const items = [
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      desc: "Not satisfied? Return within 30 days for a full refund",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      desc: "100% satisfaction guaranteed or your money back",
    },
    {
      icon: RefreshCw,
      title: "Easy Exchange",
      desc: "Hassle-free exchanges for damaged or incorrect items",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="mb-4 text-lg font-bold text-foreground">Return Policy</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <item.icon className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
