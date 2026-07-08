"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import type { Category, Product } from "@/types";

interface CategoryHeroProps {
  category: Category;
  products: Product[];
  reversed?: boolean;
}

export function CategoryHero({
  category,
  products,
  reversed,
}: CategoryHeroProps) {
  return (
    <section className="py-16 md:py-24 overflow-x-hidden">
      <Container>
        <div
          className={cn(
            "flex flex-col items-center gap-10 lg:flex-row",
            reversed && "lg:flex-row-reverse"
          )}
        >
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl lg:w-1/2"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex w-full flex-col items-start gap-6 lg:w-1/2 lg:px-8"
          >
            <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              {category.productCount} Products
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {category.name}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {category.description}
            </p>

            <div className="grid w-full grid-cols-2 gap-3 py-2">
              {products.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group flex items-center gap-3 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-secondary"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                      {product.name}
                    </p>
                    <p className="text-xs font-semibold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href={`/shop?category=${category.slug}`}
              className={cn(buttonVariants({ variant: "default" }), "mt-2")}
            >
              View All {category.name}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
