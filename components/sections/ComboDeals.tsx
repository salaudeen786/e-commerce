"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const combos = [
  {
    title: "Cake & Coffee Duo",
    description: "Any premium cake + any coffee blend at a sweet discount",
    original: "$74.98",
    price: "$59.99",
    save: "$14.99",
    image: "/images/category-cakes.svg",
    href: "/shop?combo=cake-coffee",
  },
  {
    title: "Chocolate Lover's Box",
    description: "Dark, milk, and white chocolate — the ultimate trio",
    original: "$107.97",
    price: "$84.99",
    save: "$22.98",
    image: "/images/category-chocolates.svg",
    href: "/shop?combo=chocolate-box",
  },
  {
    title: "Ultimate Celebration",
    description: "Cake, coffee, chocolates, and a gift hamper for the perfect celebration",
    original: "$214.96",
    price: "$169.99",
    save: "$44.97",
    image: "/images/category-gifts.svg",
    href: "/shop?combo=celebration",
  },
];

export function ComboDeals() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Combo Deals"
          subtitle="Save more with our specially curated bundles"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {combos.map((combo) => (
            <motion.div
              key={combo.title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <Link href={combo.href}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={combo.image}
                    alt={combo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge
                    variant="default"
                    size="lg"
                    className="absolute right-3 top-3"
                  >
                    Save {combo.save}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {combo.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {combo.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {combo.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {combo.original}
                    </span>
                  </div>
                </div>
              </Link>
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
            href="/shop?deals=combo"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Deals
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
