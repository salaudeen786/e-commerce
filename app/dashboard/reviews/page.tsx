"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { ReviewItem } from "@/components/dashboard/ReviewItem";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rated", value: "highest" },
  { label: "Lowest Rated", value: "lowest" },
] as const;

export default function ReviewsPage() {
  const userReviews = useDashboardStore((s) => s.userReviews);
  const editReview = useDashboardStore((s) => s.editReview);
  const deleteReview = useDashboardStore((s) => s.deleteReview);
  const [sort, setSort] = useState<typeof SORT_OPTIONS[number]["value"]>("newest");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editContent, setEditContent] = useState("");

  const sorted = [...userReviews].sort((a, b) => {
    switch (sort) {
      case "newest": return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest": return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest": return b.rating - a.rating;
      case "lowest": return a.rating - b.rating;
      default: return 0;
    }
  });

  const handleEdit = (review: typeof userReviews[number]) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditContent(review.content);
  };

  const handleSave = () => {
    if (editingId) {
      editReview(editingId, { rating: editRating, content: editContent });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
        <div className="flex gap-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                sort === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
          <Star className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-base font-medium text-foreground">No reviews yet</p>
          <p className="text-sm text-muted-foreground">Reviews you write will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {sorted.map((review, i) =>
              editingId === review.id ? (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground">{review.productName}</p>
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button key={i} onClick={() => setEditRating(i + 1)}>
                        <Star className={cn("h-5 w-5", i < editRating ? "fill-amber-400 text-amber-400" : "text-muted")} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="mb-3 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">Save</button>
                    <button onClick={() => setEditingId(null)} className="rounded-lg border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground">Cancel</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <ReviewItem
                    review={review}
                    onEdit={() => handleEdit(review)}
                    onDelete={() => deleteReview(review.id)}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
