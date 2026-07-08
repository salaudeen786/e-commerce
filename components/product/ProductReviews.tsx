"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/sections/RatingStars";
import { useReviewStore } from "@/store/review-store";
import type { Review } from "@/types";

interface ProductReviewsProps {
  productId: string;
  mockReviews: Review[];
}

export function ProductReviews({ productId, mockReviews }: ProductReviewsProps) {
  const { getProductReviews } = useReviewStore();
  const reviews = getProductReviews(productId, mockReviews);
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");

  const ratingBreakdown = useMemo(() => {
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.round(r.rating);
      breakdown[star] = (breakdown[star] || 0) + 1;
    });
    return breakdown;
  }, [reviews]);

  const averageRating = useMemo(
    () =>
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0,
    [reviews]
  );

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "newest":
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "highest":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
    }
    return sorted;
  }, [reviews, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mb-6 text-2xl font-bold text-foreground">
        Customer Reviews ({reviews.length})
      </h3>

      <div className="mb-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex shrink-0 flex-col items-center justify-center text-center">
            <span className="text-5xl font-bold text-primary">
              {averageRating.toFixed(1)}
            </span>
            <RatingStars rating={averageRating} size="md" className="mt-2" />
            <span className="mt-1 text-sm text-muted-foreground">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown[star] || 0;
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right text-muted-foreground">
                    {star}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-xs text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-xl border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="newest">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.03 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <RatingStars rating={review.rating} size="sm" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {review.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
