import { create } from "zustand";
import type { Product } from "@/types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      if (state.items.find((item) => item.id === product.id)) {
        return state;
      }
      return { items: [...state.items, product] };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },
  toggleItem: (product) => {
    const isIn = get().items.find((item) => item.id === product.id);
    if (isIn) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },
  isInWishlist: (productId) => {
    return !!get().items.find((item) => item.id === productId);
  },
  clearWishlist: () => set({ items: [] }),
}));
