import { create } from "zustand";
import type { Review, ReviewFormData } from "@/types";

interface ReviewState {
  userReviews: Record<string, Review[]>;
  submitReview: (productId: string, data: ReviewFormData) => void;
  getProductReviews: (productId: string, mockReviews: Review[]) => Review[];
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  userReviews: {},
  submitReview: (productId, data) => {
    const newReview: Review = {
      id: `user-rev-${Date.now()}`,
      productId,
      author: data.author || "Anonymous",
      avatar: "",
      rating: data.rating,
      content: data.content,
      date: new Date().toISOString().split("T")[0],
    };
    set((state) => ({
      userReviews: {
        ...state.userReviews,
        [productId]: [
          ...(state.userReviews[productId] || []),
          newReview,
        ],
      },
    }));
  },
  getProductReviews: (productId, mockReviews) => {
    const user = get().userReviews[productId] || [];
    return [...mockReviews, ...user];
  },
}));
