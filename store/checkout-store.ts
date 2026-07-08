import { create } from "zustand";
import { MOCK_ORDER_PREFIX } from "@/constants";

export type OrderStatus = "idle" | "processing" | "success" | "failed";

interface CheckoutState {
  orderStatus: OrderStatus;
  orderId: string | null;
  orderError: string | null;
  placeOrder: () => Promise<void>;
  resetOrder: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  orderStatus: "idle",
  orderId: null,
  orderError: null,

  placeOrder: async () => {
    set({ orderStatus: "processing", orderError: null });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const failed = Math.random() < 0.05;
    if (failed) {
      set({
        orderStatus: "failed",
        orderError: "Payment authorization declined. Please try a different card or contact your bank.",
      });
    } else {
      const id = `${MOCK_ORDER_PREFIX}${Date.now()}`;
      set({ orderStatus: "success", orderId: id });
    }
  },

  resetOrder: () => {
    set({ orderStatus: "idle", orderId: null, orderError: null });
  },
}));
