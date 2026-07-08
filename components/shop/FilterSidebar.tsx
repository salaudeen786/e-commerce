"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RatingStars } from "@/components/sections/RatingStars";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  FLAVOR_OPTIONS,
  OCCASION_OPTIONS,
  WEIGHT_OPTIONS,
  DIETARY_OPTIONS,
} from "@/constants";
import type { ShopFilters } from "@/types";

interface FilterSidebarProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  onClose?: () => void;
  categories?: { slug: string; name: string; productCount: number }[];
  productCount: number;
  className?: string;
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-4 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
  getCount,
}: {
  options: readonly { label: string; value: string }[];
  selected: string[];
  onChange: (value: string) => void;
  getCount?: (value: string) => number;
}) {
  return (
    <div className="space-y-1.5">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        const count = getCount?.(option.value);
        return (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 rounded border-border text-primary accent-primary"
            />
            <span className="flex-1 text-foreground">{option.label}</span>
            {count !== undefined && (
              <span className="text-xs text-muted-foreground">({count})</span>
            )}
          </label>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly { label: string; value: number | string }[];
  selected: number | string | null;
  onChange: (value: number | string | null) => void;
}) {
  return (
    <div className="space-y-1.5">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <label
            key={String(option.value)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <input
              type="radio"
              name="filter-radio"
              checked={isSelected}
              onChange={() =>
                onChange(isSelected ? null : option.value)
              }
              className="h-4 w-4 border-border text-primary accent-primary"
            />
            <span className="text-foreground">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onChange,
  onClose,
  categories = [],
  productCount,
  className,
}: FilterSidebarProps) {
  const priceLabel = (min: number, max: number) => {
    if (max === Infinity) return `Over $${min}`;
    return `$${min} - $${max}`;
  };

  const handleCategoryToggle = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onChange({ ...filters, categories: next, page: 1 });
  };

  const handlePriceToggle = (min: number, max: number) => {
    const key = `${min}-${max}`;
    const currentKey = `${filters.priceRange[0]}-${filters.priceRange[1]}`;
    if (currentKey === key) {
      onChange({ ...filters, priceRange: [0, Infinity], page: 1 });
    } else {
      onChange({ ...filters, priceRange: [min, max], page: 1 });
    }
  };

  const handleRatingToggle = (value: number | null) => {
    onChange({
      ...filters,
      rating: filters.rating === value ? null : value,
      page: 1,
    });
  };

  const handleFlavorToggle = (value: string) => {
    const next = filters.flavors.includes(value)
      ? filters.flavors.filter((f) => f !== value)
      : [...filters.flavors, value];
    onChange({ ...filters, flavors: next, page: 1 });
  };

  const handleOccasionToggle = (value: string) => {
    const next = filters.occasions.includes(value)
      ? filters.occasions.filter((o) => o !== value)
      : [...filters.occasions, value];
    onChange({ ...filters, occasions: next, page: 1 });
  };

  const handleWeightToggle = (value: string) => {
    const next = filters.weights.includes(value)
      ? filters.weights.filter((w) => w !== value)
      : [...filters.weights, value];
    onChange({ ...filters, weights: next, page: 1 });
  };

  const handleDietaryToggle = (value: string) => {
    const next = filters.dietary.includes(value)
      ? filters.dietary.filter((d) => d !== value)
      : [...filters.dietary, value];
    onChange({ ...filters, dietary: next, page: 1 });
  };

  const handleStockToggle = () => {
    onChange({
      ...filters,
      inStock: filters.inStock === true ? null : true,
      page: 1,
    });
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

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < Infinity ||
    filters.rating !== null ||
    filters.flavors.length > 0 ||
    filters.occasions.length > 0 ||
    filters.weights.length > 0 ||
    filters.dietary.length > 0 ||
    filters.inStock !== null;

  const getCategoryCount = (slug: string) =>
    categories.find((c) => c.slug === slug)?.productCount ?? 0;

  const getFlavorCount = (flavor: string) => {
    return 0;
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Clear All
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-2">
        <FilterSection title="Category" open={true} onToggle={() => {}}>
          <CheckboxGroup
            options={categories.map((c) => ({
              label: c.name,
              value: c.slug,
            }))}
            selected={filters.categories}
            onChange={handleCategoryToggle}
            getCount={getCategoryCount}
          />
        </FilterSection>

        <FilterSection title="Price Range" open={true} onToggle={() => {}}>
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range) => {
              const key = `${range.min}-${range.max}`;
              const isSelected =
                filters.priceRange[0] === range.min &&
                filters.priceRange[1] === range.max;
              return (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 text-sm transition-colors hover:bg-muted"
                >
                  <input
                    type="radio"
                    name="price-range"
                    checked={isSelected}
                    onChange={() => handlePriceToggle(range.min, range.max)}
                    className="h-4 w-4 border-border text-primary accent-primary"
                  />
                  <span className="text-foreground">
                    {priceLabel(range.min, range.max)}
                  </span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Rating" open={true} onToggle={() => {}}>
          <RadioGroup
            options={RATING_OPTIONS.map((o) => ({
              ...o,
              value: o.value,
            }))}
            selected={filters.rating}
            onChange={(v) => handleRatingToggle(v as number | null)}
          />
        </FilterSection>

        <FilterSection title="Flavor" open={false} onToggle={() => {}}>
          <CheckboxGroup
            options={FLAVOR_OPTIONS}
            selected={filters.flavors}
            onChange={handleFlavorToggle}
          />
        </FilterSection>

        <FilterSection title="Occasion" open={false} onToggle={() => {}}>
          <CheckboxGroup
            options={OCCASION_OPTIONS}
            selected={filters.occasions}
            onChange={handleOccasionToggle}
          />
        </FilterSection>

        <FilterSection title="Weight" open={false} onToggle={() => {}}>
          <CheckboxGroup
            options={WEIGHT_OPTIONS}
            selected={filters.weights}
            onChange={handleWeightToggle}
          />
        </FilterSection>

        <FilterSection title="Dietary" open={false} onToggle={() => {}}>
          <CheckboxGroup
            options={DIETARY_OPTIONS}
            selected={filters.dietary}
            onChange={handleDietaryToggle}
          />
        </FilterSection>

        <FilterSection title="Availability" open={true} onToggle={() => {}}>
          <label className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 text-sm transition-colors hover:bg-muted">
            <input
              type="checkbox"
              checked={filters.inStock === true}
              onChange={handleStockToggle}
              className="h-4 w-4 rounded border-border text-primary accent-primary"
            />
            <span className="text-foreground">In Stock Only</span>
          </label>
        </FilterSection>
      </div>

      <div className="border-t border-border px-5 py-3">
        <p className="text-center text-sm text-muted-foreground">
          {productCount} product{productCount !== 1 ? "s" : ""} found
        </p>
      </div>
    </div>
  );
}
