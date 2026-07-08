"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const announcements = [
  "Free shipping on orders over $50",
  "Get 15% off your first order — use code SWEET15",
  "Order by 2 PM for same-day delivery",
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-center text-xs font-medium sm:text-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {announcements[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        aria-label="Close announcement"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
