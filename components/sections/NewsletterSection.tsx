"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary to-accent/20" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-primary/10"
          >
            <Mail className="h-6 w-6 text-primary" />
          </motion.div>

          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Stay in the Sweet Loop
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Subscribe for exclusive offers, new arrivals, and sweet inspiration
            delivered to your inbox.
          </p>

          <div className="mt-6 mx-auto max-w-md">
            <NewsletterForm />
          </div>

          <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Get 15% off your first order when you subscribe
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
