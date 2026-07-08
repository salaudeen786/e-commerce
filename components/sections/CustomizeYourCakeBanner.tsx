"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export function CustomizeYourCakeBanner() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary to-accent/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,79,135,0.15),transparent_50%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10"
          >
            <Sparkles className="h-7 w-7 text-primary" />
          </motion.div>

          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Design Your Dream Cake
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose your flavor, filling, frosting, and decoration. Our master
            bakers will bring your vision to life for your special occasion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/customize"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Customize Now
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              href="/gallery"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View Gallery
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
