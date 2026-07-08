"use client";

import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export function DeliveryInfo() {
  const items = [
    {
      icon: Truck,
      title: "Free Delivery",
      desc: "Free standard delivery on orders over $50",
    },
    {
      icon: Clock,
      title: "Express Option",
      desc: "Express delivery available within 2-4 hours",
    },
    {
      icon: MapPin,
      title: "Nationwide",
      desc: "We deliver across all 50 states",
    },
    {
      icon: Package,
      title: "Secure Packaging",
      desc: "Premium packaging to ensure freshness",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="mb-4 text-lg font-bold text-foreground">Delivery Info</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
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
