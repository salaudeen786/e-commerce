"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden md:min-h-screen mt-14">
      <Image
        src="/images/hero/Euro.webp"
        alt="Premium celebration cakes and treats"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />


      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="pointer-events-none absolute -bottom-20 -right-20 size-96 rounded-full bg-white blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="pointer-events-none absolute -left-20 top-1/3 size-64 rounded-full bg-white blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="pointer-events-none absolute right-1/3 top-10 size-32 rounded-full bg-white blur-2xl"
      />

      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
          >
            Hand made from Home
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Celebrate Life's{" "}
            <span className="text-primary">Sweetest Moments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
          >
            Discover handcrafted premium cakes, artisanal coffees, and
            luxurious chocolates. Every bite tells a story of passion and
            perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/shop"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Shop Now
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              href="/shop?category=cakes"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Explore Cakes
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
