"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  FLAVOR_OPTIONS,
  OCCASION_OPTIONS,
  WEIGHT_OPTIONS,
  DIETARY_OPTIONS,
} from "@/constants";
import type { ShopFilters } from "@/types";

interface ActiveFiltersProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  categories?: { slug: string; name: string }[];
}

function getLabel(
  options: readonly { label: string; value: string }[],
  value: string
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function ActiveFilters({
  filters,
  onChange,
  categories = [],
}: ActiveFiltersProps) {
  const removeCategory = (slug: string) => {
    onChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== slug),
      page: 1,
    });
  };

  const removeFlavor = (flavor: string) => {
    onChange({
      ...filters,
      flavors: filters.flavors.filter((f) => f !== flavor),
      page: 1,
    });
  };

  const removeOccasion = (occasion: string) => {
    onChange({
      ...filters,
      occasions: filters.occasions.filter((o) => o !== occasion),
      page: 1,
    });
  };

  const removeWeight = (weight: string) => {
    onChange({
      ...filters,
      weights: filters.weights.filter((w) => w !== weight),
      page: 1,
    });
  };

  const removeDietary = (dietary: string) => {
    onChange({
      ...filters,
      dietary: filters.dietary.filter((d) => d !== dietary),
      page: 1,
    });
  };

  const clearPrice = () => {
    onChange({ ...filters, priceRange: [0, Infinity], page: 1 });
  };

  const clearRating = () => {
    onChange({ ...filters, rating: null, page: 1 });
  };

  const clearStock = () => {
    onChange({ ...filters, inStock: null, page: 1 });
  };

  const clearAll = () => {
    onChange({
      categories: [],
      priceRange: [0, Infinity],
      rating: null,
      flavors: [],
      occasions: [],
      weights: [],
      dietary: [],
      inStock: null,
      search: "",
      sort: "popular",
      page: 1,
    });
  };

  const activeCategoryNames = filters.categories
    .map((slug) => categories.find((c) => c.slug === slug)?.name)
    .filter(Boolean) as string[];

  const priceLabel = (() => {
    const [min, max] = filters.priceRange;
    if (min === 0 && max === Infinity) return null;
    if (max === Infinity) return `Over $${min}`;
    return `$${min} - $${max}`;
  })();

  const ratingLabel = filters.rating
    ? `${filters.rating} & above`
    : null;

  const items: { label: string; onRemove: () => void }[] = [
    ...activeCategoryNames.map((name) => ({
      label: name,
      onRemove: () =>
        removeCategory(
          filters.categories.find(
            (slug) => categories.find((c) => c.slug === slug)?.name === name
          )!
        ),
    })),
    ...(priceLabel
      ? [{ label: priceLabel, onRemove: clearPrice }]
      : []),
    ...(ratingLabel
      ? [{ label: ratingLabel, onRemove: clearRating }]
      : []),
    ...filters.flavors.map((f) => ({
      label: getLabel(FLAVOR_OPTIONS, f),
      onRemove: () => removeFlavor(f),
    })),
    ...filters.occasions.map((o) => ({
      label: getLabel(OCCASION_OPTIONS, o),
      onRemove: () => removeOccasion(o),
    })),
    ...filters.weights.map((w) => ({
      label: getLabel(WEIGHT_OPTIONS, w),
      onRemove: () => removeWeight(w),
    })),
    ...filters.dietary.map((d) => ({
      label: getLabel(DIETARY_OPTIONS, d),
      onRemove: () => removeDietary(d),
    })),
    ...(filters.inStock === true
      ? [{ label: "In Stock", onRemove: clearStock }]
      : []),
  ];

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Active filters:</span>
      {items.map((item, idx) => (
        <Badge key={idx} variant="secondary" size="sm" className="gap-1">
          {item.label}
          <button onClick={item.onRemove} className="ml-0.5 hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <button
        onClick={clearAll}
        className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
      >
        Clear All
      </button>
    </div>
  );
}
