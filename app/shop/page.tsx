"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/sections/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { MobileFilterDrawer } from "@/components/shop/MobileFilterDrawer";
import { SearchBar } from "@/components/shop/SearchBar";
import { SortSelect } from "@/components/shop/SortSelect";
import { ViewToggle } from "@/components/shop/ViewToggle";
import { Pagination } from "@/components/shop/Pagination";
import { ProductListView } from "@/components/shop/ProductListView";
import { ActiveFilters } from "@/components/shop/ActiveFilters";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import { ProductListSkeleton } from "@/components/shop/ProductListSkeleton";
import { FilterSidebarSkeleton } from "@/components/shop/FilterSidebarSkeleton";
import { products, categories } from "@/mocks/mock-data";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import type { ShopFilters, SortOption, ViewMode, Product } from "@/types";

function filterProducts(allProducts: Product[], filters: ShopFilters): Product[] {
  return allProducts.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category.slug)
    ) {
      return false;
    }

    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    if (filters.rating !== null && product.rating < filters.rating) {
      return false;
    }

    if (
      filters.flavors.length > 0 &&
      (!product.flavor || !filters.flavors.includes(product.flavor))
    ) {
      return false;
    }

    if (
      filters.occasions.length > 0 &&
      (!product.occasion || !filters.occasions.includes(product.occasion))
    ) {
      return false;
    }

    if (
      filters.weights.length > 0 &&
      (!product.weight || !filters.weights.includes(product.weight))
    ) {
      return false;
    }

    if (
      filters.dietary.length > 0 &&
      (!product.dietaryInfo ||
        !filters.dietary.some((d) => product.dietaryInfo?.includes(d)))
    ) {
      return false;
    }

    if (filters.inStock === true && !product.inStock) {
      return false;
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCategory = product.category.name.toLowerCase().includes(q);
      const matchFlavor = product.flavor?.toLowerCase().includes(q);
      const matchOccasion = product.occasion?.toLowerCase().includes(q);
      if (
        !matchName &&
        !matchDesc &&
        !matchCategory &&
        !matchFlavor &&
        !matchOccasion
      ) {
        return false;
      }
    }

    return true;
  });
}

function sortProducts(filtered: Product[], sort: SortOption): Product[] {
  const sorted = [...filtered];
  switch (sort) {
    case "popular":
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "newest":
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }
  return sorted;
}

const defaultFilters: ShopFilters = {
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
};

export default function ShopPage() {
  const [filters, setFilters] = useState<ShopFilters>(defaultFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const allFiltered = useMemo(
    () => sortProducts(filterProducts(products, filters), filters.sort),
    [filters]
  );

  const totalPages = Math.max(1, Math.ceil(allFiltered.length / DEFAULT_PAGE_SIZE));
  const safePage = Math.min(filters.page, totalPages);

  const paginated = useMemo(
    () => allFiltered.slice((safePage - 1) * DEFAULT_PAGE_SIZE, safePage * DEFAULT_PAGE_SIZE),
    [allFiltered, safePage]
  );

  useEffect(() => {
    if (safePage !== filters.page) {
      setFilters((prev) => ({ ...prev, page: safePage }));
    }
  }, [safePage, filters.page]);

  const handleFilterChange = (newFilters: ShopFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleSortChange = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryOptions = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    productCount: c.productCount,
  }));

  const showEmptyState = !loading && allFiltered.length === 0 && !filters.search;
  const showNoResults = !loading && allFiltered.length === 0 && !!filters.search;

  return (
    <>
      <section className="bg-gradient-to-b from-secondary/30 to-background pb-8 pt-28">
        <Container>
          <SectionHeading
            title="Our Shop"
            subtitle="Browse our curated collection of premium cakes, coffees, chocolates, and gifts"
          />

          <div className="mx-auto max-w-2xl">
            <SearchBar
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="flex gap-8">
            <aside className="hidden w-72 shrink-0 lg:block">
              {loading ? (
                <FilterSidebarSkeleton />
              ) : (
                <div className="sticky top-28">
                  <FilterSidebar
                    filters={filters}
                    onChange={handleFilterChange}
                    categories={categoryOptions}
                    productCount={allFiltered.length}
                  />
                </div>
              )}
            </aside>

            <div className="flex-1">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MobileFilterDrawer
                    open={mobileFilterOpen}
                    onOpenChange={setMobileFilterOpen}
                    filters={filters}
                    onChange={handleFilterChange}
                    categories={categoryOptions}
                    productCount={allFiltered.length}
                  />
                  <p className="text-sm text-muted-foreground">
                    {loading ? (
                      <span className="inline-block h-4 w-24 animate-pulse rounded bg-muted" />
                    ) : (
                      <>
                        Showing{" "}
                        <span className="font-medium text-foreground">
                          {paginated.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-foreground">
                          {allFiltered.length}
                        </span>{" "}
                        products
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <SortSelect
                    value={filters.sort}
                    onChange={handleSortChange}
                  />
                  <ViewToggle value={viewMode} onChange={setViewMode} />
                </div>
              </div>

              <ActiveFilters
                filters={filters}
                onChange={handleFilterChange}
                categories={categoryOptions}
              />

              <div className="mt-4">
                {loading ? (
                  viewMode === "grid" ? (
                    <ProductGridSkeleton />
                  ) : (
                    <ProductListSkeleton />
                  )
                ) : showEmptyState ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <PackageOpen className="mb-4 h-16 w-16 text-muted-foreground/40" />
                    <h3 className="text-lg font-semibold text-foreground">
                      No products available
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your filters or check back later for new
                      arrivals.
                    </p>
                  </motion.div>
                ) : showNoResults ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <PackageOpen className="mb-4 h-16 w-16 text-muted-foreground/40" />
                    <h3 className="text-lg font-semibold text-foreground">
                      No results found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We couldn&apos;t find any products matching &ldquo;
                      {filters.search}&rdquo;. Try a different search term or
                      adjust your filters.
                    </p>
                  </motion.div>
                ) : viewMode === "grid" ? (
                  <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 },
                      },
                    }}
                  >
                    {paginated.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 },
                      },
                    }}
                  >
                    {paginated.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <ProductListView product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {!loading && allFiltered.length > 0 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
