"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const featuredItems = [
  {
    title: "Birthday Cakes",
    image: "/images/category-cakes.svg",
    href: "/shop?category=cakes&tag=birthday",
    count: 12,
  },
  {
    title: "Wedding Specials",
    image: "/images/category-cakes.svg",
    href: "/shop?category=cakes&tag=wedding",
    count: 8,
  },
  {
    title: "Coffee Beans",
    image: "/images/category-coffee.svg",
    href: "/shop?category=coffee",
    count: 6,
  },
  {
    title: "Gift Hampers",
    image: "/images/category-gifts.svg",
    href: "/shop?category=gifts",
    count: 10,
  },
];

export function FeaturedCategoriesGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Featured Collections"
          subtitle="Our most loved collections curated just for you"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link href={item.href}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-heading text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <Badge variant="secondary" size="sm" className="mt-2">
                    {item.count} items
                  </Badge>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
