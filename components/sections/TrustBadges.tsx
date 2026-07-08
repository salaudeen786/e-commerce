"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, ChefHat, Headphones } from "lucide-react";
import { Container } from "@/components/ui/container";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const badges = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
  { icon: ShieldCheck, label: "Secure Checkout", desc: "100% safe payment" },
  { icon: ChefHat, label: "Fresh Baked", desc: "Made to order daily" },
  { icon: Headphones, label: "24/7 Support", desc: "We're here to help" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={fadeInUp}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {badge.label}
                </p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
