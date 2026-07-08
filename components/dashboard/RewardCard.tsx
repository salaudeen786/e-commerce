"use client";

import { motion } from "framer-motion";
import { Star, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { REWARD_TIERS } from "@/constants";

export function RewardCard({ points, lifetimePoints }: { points: number; lifetimePoints: number }) {
  const currentTier = [...REWARD_TIERS].reverse().find((t) => points >= t.minPoints) || REWARD_TIERS[0];
  const nextTier = REWARD_TIERS.find((t) => t.minPoints > points);
  const progress = nextTier ? points / nextTier.minPoints : 1;
  const pointsValue = (points * 0.1).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Available Points</p>
          <p className="text-4xl font-bold text-foreground">{points.toLocaleString()}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Star className="h-7 w-7 text-primary" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
          {currentTier.name}
        </span>
        <span className="text-xs text-muted-foreground">
          = ${pointsValue} value
        </span>
      </div>

      {nextTier && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{currentTier.name}</span>
            <span>{nextTier.name}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-primary"
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {nextTier.minPoints - points} points to {nextTier.name}
          </p>
        </div>
      )}

      <div className="mt-4 rounded-lg bg-background/60 p-3 text-xs text-muted-foreground">
        Lifetime points: {lifetimePoints.toLocaleString()} · {REWARD_TIERS.length} tiers available
      </div>
    </motion.div>
  );
}
