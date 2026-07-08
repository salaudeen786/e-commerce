"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useReviewStore } from "@/store/review-store";
import type { ReviewFormData } from "@/types";

interface ReviewFormProps {
  productId: string;
  onSubmitSuccess?: () => void;
}

export function ReviewForm({ productId, onSubmitSuccess }: ReviewFormProps) {
  const { submitReview } = useReviewStore();
  const [form, setForm] = useState<ReviewFormData>({
    author: "",
    rating: 0,
    content: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0 || !form.content.trim()) return;
    submitReview(productId, form);
    setSubmitted(true);
    onSubmitSuccess?.();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ author: "", rating: 0, content: "" });
    }, 3000);
  };

  const isValid = form.rating > 0 && form.content.trim().length > 0;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
      >
        <p className="text-lg font-semibold text-emerald-800">
          Thank you for your review!
        </p>
        <p className="mt-1 text-sm text-emerald-600">
          Your feedback helps us improve.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h4 className="mb-4 text-lg font-bold text-foreground">Write a Review</h4>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Your Name{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          type="text"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Enter your name"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Rating <span className="text-destructive">*</span>
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setForm({ ...form, rating: star })}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="transition-transform hover:scale-110"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={
                  star <= (hoveredStar || form.rating)
                    ? "#f59e0b"
                    : "none"
                }
                stroke={
                  star <= (hoveredStar || form.rating)
                    ? "#f59e0b"
                    : "#d1d5db"
                }
                strokeWidth="1.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
          {form.rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {form.rating === 1 && "Poor"}
              {form.rating === 2 && "Fair"}
              {form.rating === 3 && "Good"}
              {form.rating === 4 && "Very Good"}
              {form.rating === 5 && "Excellent"}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Review <span className="text-destructive">*</span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={4}
          placeholder="Share your experience with this product..."
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <Button type="submit" disabled={!isValid}>
        Submit Review
      </Button>
    </motion.form>
  );
}
