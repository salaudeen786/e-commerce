"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { categories } from "@/mocks/mock-data";

export function ShopByCategory() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Shop by Category"
          subtitle="Explore our carefully curated collection of premium treats"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link href={`/shop?category=${category.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {category.productCount} Products
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
                    Shop Now <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
