"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/sections/ProductCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { bestSellers } from "@/mocks/mock-data";

export function BestSellingCakes() {
  const items = bestSellers.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Best Selling Cakes"
          subtitle="Our most loved cakes, handpicked by customers like you"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/shop?sort=best-seller"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Best Sellers
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
