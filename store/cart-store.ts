import { create } from "zustand";
import type {
  CartItem,
  Product,
  CartItemCustomizations,
  GiftWrapInfo,
  AppliedCoupon,
  ShippingOption,
  SavedItem,
} from "@/types";
import { offers } from "@/mocks/mock-data";
import { getWeightUpcharge, MESSAGE_FEE, EXPRESS_DELIVERY_FEE } from "@/mocks/product-utils";

let nextItemId = 1;
let nextSavedId = 1;

const SHIPPING_OPTIONS: ShippingOption[] = [
  { method: "free", label: "Free Shipping", cost: 0, estimatedDays: "5–8 business days" },
  { method: "standard", label: "Standard Shipping", cost: 5.99, estimatedDays: "3–5 business days" },
  { method: "express", label: "Express Shipping", cost: 12.99, estimatedDays: "1–2 business days" },
  { method: "overnight", label: "Overnight Shipping", cost: 24.99, estimatedDays: "Next business day" },
];

const GIFT_WRAP_PRICE = 4.99;

interface CartState {
  items: CartItem[];
  giftWrap: GiftWrapInfo;
  coupon: AppliedCoupon | null;
  couponError: string | null;
  shipping: ShippingOption;
  savedItems: SavedItem[];

  addItem: (
    product: Product,
    quantity?: number,
    customizations?: CartItemCustomizations
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  setGiftWrap: (info: Partial<GiftWrapInfo>) => void;
  toggleGiftWrap: () => void;

  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  setShipping: (method: string) => void;

  moveToSaved: (itemId: string) => void;
  moveToCart: (savedItemId: string) => void;
  removeSaved: (savedItemId: string) => void;

  moveToWishlist: (itemId: string) => void;

  subtotal: () => number;
  discountAmount: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  giftWrap: { enabled: false, price: GIFT_WRAP_PRICE },
  coupon: null,
  couponError: null,
  shipping: SHIPPING_OPTIONS[0],
  savedItems: [],

  addItem: (product, quantity = 1, customizations) => {
    set((state) => {
      if (!customizations) {
        const existing = state.items.find(
          (item) => item.product.id === product.id && !item.customizations
        );
        if (existing) {
          return {
            items: state.items.map((item) =>
              item.itemId === existing.itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
      }
      return {
        items: [
          ...state.items,
          {
            product,
            quantity,
            customizations,
            itemId: `cart-${nextItemId++}`,
          },
        ],
      };
    });
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.itemId !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [], coupon: null, couponError: null }),

  setGiftWrap: (info) => {
    set((state) => ({
      giftWrap: { ...state.giftWrap, ...info },
    }));
  },

  toggleGiftWrap: () => {
    set((state) => ({
      giftWrap: { ...state.giftWrap, enabled: !state.giftWrap.enabled },
    }));
  },

  applyCoupon: (code) => {
    const upper = code.toUpperCase().trim();
    const found = offers.find((o) => o.code === upper);
    if (!found) {
      set({ coupon: null, couponError: "Invalid coupon code" });
      return false;
    }
    const pct = parseInt(found.discount.replace("%", ""), 10);
    if (isNaN(pct) || pct <= 0) {
      set({ coupon: null, couponError: "Invalid discount value" });
      return false;
    }
    set({
      coupon: {
        code: found.code,
        discountPercent: pct,
        type: "percentage",
      },
      couponError: null,
    });
    return true;
  },

  removeCoupon: () => {
    set({ coupon: null, couponError: null });
  },

  setShipping: (method) => {
    const opt = SHIPPING_OPTIONS.find((s) => s.method === method);
    if (opt) set({ shipping: opt });
  },

  moveToSaved: (itemId) => {
    const state = get();
    const item = state.items.find((i) => i.itemId === itemId);
    if (!item) return;
    set({
      items: state.items.filter((i) => i.itemId !== itemId),
      savedItems: [
        ...state.savedItems,
        {
          id: `saved-${nextSavedId++}`,
          product: item.product,
          addedAt: new Date().toISOString(),
        },
      ],
    });
  },

  moveToCart: (savedItemId) => {
    const state = get();
    const saved = state.savedItems.find((s) => s.id === savedItemId);
    if (!saved) return;
    get().addItem(saved.product);
    set({
      savedItems: state.savedItems.filter((s) => s.id !== savedItemId),
    });
  },

  removeSaved: (savedItemId) => {
    set((state) => ({
      savedItems: state.savedItems.filter((s) => s.id !== savedItemId),
    }));
  },

  moveToWishlist: (itemId) => {
    get().removeItem(itemId);
  },

  subtotal: () => {
    return get().items.reduce((acc, item) => {
      let base = item.product.price;
      if (item.customizations) {
        base += getWeightUpcharge(item.customizations.weight);
        if (item.customizations.cakeMessage) base += MESSAGE_FEE;
        if (item.customizations.deliveryTime === "express") base += EXPRESS_DELIVERY_FEE;
      }
      return acc + base * item.quantity;
    }, 0);
  },

  discountAmount: () => {
    const { coupon } = get();
    if (!coupon) return 0;
    const sub = get().subtotal();
    if (coupon.type === "percentage") {
      return sub * (coupon.discountPercent / 100);
    }
    return 0;
  },

  total: () => {
    const state = get();
    const sub = state.subtotal();
    const discount = state.discountAmount();
    const shipping = state.shipping.cost;
    const giftWrap = state.giftWrap.enabled ? state.giftWrap.price : 0;
    return Math.max(0, sub - discount + shipping + giftWrap);
  },

  itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
}));
