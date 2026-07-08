import { products, frequentlyBoughtTogether } from "@/mocks/mock-data";
import type { Product } from "@/types";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return products
    .filter(
      (p) =>
        p.category.slug === product.category.slug && p.id !== product.id
    )
    .slice(0, limit);
}

export function getBoughtTogether(
  product: Product,
  limit = 3
): Product[] {
  const ids = frequentlyBoughtTogether[product.id];
  if (!ids) return [];
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, limit);
}

const WEIGHT_PRICE_MAP: Record<string, number> = {
  "500g": 0,
  "1l": 0,
  "1kg": 10,
  "2kg": 25,
};

export function getWeightUpcharge(weight?: string): number {
  if (!weight) return 0;
  return WEIGHT_PRICE_MAP[weight] ?? 0;
}

export const MESSAGE_FEE = 5;
export const EXPRESS_DELIVERY_FEE = 10;

export function calculateTotalPrice(
  basePrice: number,
  weight?: string,
  hasMessage?: boolean,
  isExpressDelivery?: boolean
): number {
  let total = basePrice;
  total += getWeightUpcharge(weight);
  if (hasMessage) total += MESSAGE_FEE;
  if (isExpressDelivery) total += EXPRESS_DELIVERY_FEE;
  return total;
}

const RECENTLY_VIEWED_KEY = "sweet_moments_recently_viewed";
const MAX_RECENT = 6;

export function addRecentlyViewed(productSlug: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let slugs: string[] = stored ? JSON.parse(stored) : [];
    slugs = slugs.filter((s) => s !== productSlug);
    slugs.unshift(productSlug);
    if (slugs.length > MAX_RECENT) slugs = slugs.slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(slugs));
  } catch {
  }
}

export function getRecentlyViewed(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!stored) return [];
    const slugs: string[] = JSON.parse(stored);
    return slugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => p !== undefined);
  } catch {
    return [];
  }
}
