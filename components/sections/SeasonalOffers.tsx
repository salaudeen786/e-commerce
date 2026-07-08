"use client";

import { motion } from "framer-motion";
import { Tag, Copy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { offers } from "@/mocks/mock-data";

export function SeasonalOffers() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Seasonal Offers"
          subtitle="Don't miss out on these sweet deals"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="default" size="lg">
                  {offer.discount}
                </Badge>
              </div>

              <h3 className="font-heading text-lg font-bold text-foreground">
                {offer.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {offer.description}
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5">
                <code className="flex-1 text-sm font-semibold tracking-wide text-foreground">
                  {offer.code}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(offer.code)}
                  aria-label="Copy code"
                  className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Valid until {new Date(offer.validUntil).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
