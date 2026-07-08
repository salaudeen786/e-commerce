"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DELIVERY_TIMES = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
];

interface DeliveryPickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  className?: string;
}

export function DeliveryPicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  className,
}: DeliveryPickerProps) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("space-y-4", className)}
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Delivery Date
        </label>
        <input
          type="date"
          value={date}
          min={minDateStr}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Delivery Time Slot
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DELIVERY_TIMES.map((slot) => (
            <button
              key={slot}
              onClick={() => onTimeChange(slot)}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm transition-all",
                time === slot
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
