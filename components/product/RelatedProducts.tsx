"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/sections/ProductCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { getRelatedProducts } from "@/mocks/product-utils";
import type { Product } from "@/types";

interface RelatedProductsProps {
  product: Product;
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = getRelatedProducts(product, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          title="Related Products"
          subtitle="You might also like"
          align="left"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
