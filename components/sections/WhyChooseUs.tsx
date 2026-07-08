"use client";

import { motion } from "framer-motion";
import { Award, Leaf, Heart, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const features = [
  {
    icon: Award,
    title: "Premium Ingredients",
    description:
      "We source only the finest ingredients — Belgian chocolate, organic flour, and fresh dairy — for unmatched quality.",
  },
  {
    icon: Heart,
    title: "Handcrafted with Love",
    description:
      "Every cake, chocolate, and blend is made by our expert artisans with passion and attention to detail.",
  },
  {
    icon: Leaf,
    title: "Fresh Daily",
    description:
      "We bake and prepare everything fresh every day. No preservatives, no shortcuts, just pure quality.",
  },
  {
    icon: Package,
    title: "Beautiful Packaging",
    description:
      "Each order arrives in elegant, gift-ready packaging designed to impress and delight your loved ones.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Why Choose Sweet Moments"
          subtitle="We go the extra mile to make every celebration extraordinary"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
