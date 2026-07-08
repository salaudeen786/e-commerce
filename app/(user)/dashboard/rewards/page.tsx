"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Users, Clock, Gift } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { RewardCard } from "@/components/dashboard/RewardCard";
import { REWARD_TIERS } from "@/constants";
import { cn } from "@/lib/utils";

const HOW_TO_EARN = [
  { icon: ShoppingBag, label: "Make a purchase", points: "1 point per $1 spent" },
  { icon: Star, label: "Write a review", points: "50 points per review" },
  { icon: Users, label: "Refer a friend", points: "200 points per referral" },
  { icon: Clock, label: "Birthday bonus", points: "500 points on your birthday" },
];

export default function RewardsPage() {
  const rewardPoints = useDashboardStore((s) => s.rewardPoints);
  const transactions = useDashboardStore((s) => s.rewardTransactions);
  const [txFilter, setTxFilter] = useState<"all" | "earned" | "redeemed">("all");

  const filteredTx = txFilter === "all" ? transactions : transactions.filter((t) => t.type === txFilter);
  const lifetimePoints = transactions.reduce((sum, t) => t.type === "earned" ? sum + t.points : sum, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
      <RewardCard points={rewardPoints} lifetimePoints={lifetimePoints} />

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Gift className="h-4 w-4 text-primary" /> Reward Tiers
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REWARD_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border p-3 text-center"
            >
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: tier.color + "20" }}>
                <Star className="h-4 w-4" style={{ color: tier.color }} />
              </div>
              <p className="text-sm font-bold text-foreground capitalize">{tier.name}</p>
              <p className="text-xs text-muted-foreground">{tier.minPoints.toLocaleString()} pts</p>
              <p className="text-xs text-muted-foreground">{tier.multiplier}x multiplier</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">How to Earn Points</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {HOW_TO_EARN.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Transaction History</h3>
          <div className="flex gap-1">
            {(["all", "earned", "redeemed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                  txFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {filteredTx.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">No transactions found.</p>
          ) : (
            filteredTx.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <span className={cn("text-sm font-bold", tx.type === "earned" ? "text-emerald-600" : "text-destructive")}>
                  {tx.type === "earned" ? "+" : "-"}{tx.points}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
