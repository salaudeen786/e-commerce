"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Edit, Trash2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { UserReview } from "@/types";

interface ReviewItemProps {
  review: UserReview;
  onEdit: () => void;
  onDelete: () => void;
}

export function ReviewItem({ review, onEdit, onDelete }: ReviewItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-4"
    >
      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image src={review.productImage} alt={review.productName} fill className="object-cover" sizes="56px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{review.productName}</p>
          <div className="mt-0.5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted")} />
            ))}
            {review.isVerified && (
              <span className="ml-1.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Verified
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(review.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-7")} aria-label="Edit review">
            <Edit className="h-3.5 w-3.5" />
          </button>
          <button onClick={onDelete} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-7 text-muted-foreground hover:text-destructive")} aria-label="Delete review">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
