"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/sections/ProductCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { getRecentlyViewed, addRecentlyViewed } from "@/mocks/product-utils";
import type { Product } from "@/types";

interface RecentlyViewedProps {
  currentProductSlug: string;
}

export function RecentlyViewed({ currentProductSlug }: RecentlyViewedProps) {
  const [recent, setRecent] = useState<Product[]>([]);

  useEffect(() => {
    addRecentlyViewed(currentProductSlug);
    const items = getRecentlyViewed().filter(
      (p) => p.slug !== currentProductSlug
    );
    setRecent(items);
  }, [currentProductSlug]);

  if (recent.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          title="Recently Viewed"
          subtitle="Products you've explored"
          align="left"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {recent.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
