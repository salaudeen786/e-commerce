"use client";

import { motion } from "framer-motion";
import { ShoppingCart, ChefHat, Truck, PartyPopper } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const steps = [
  {
    icon: ShoppingCart,
    title: "Place Your Order",
    description: "Browse our collection and select your favorites. Customize if you'd like.",
    step: "01",
  },
  {
    icon: ChefHat,
    title: "We Craft It Fresh",
    description: "Our master bakers and chocolatiers prepare everything fresh to order.",
    step: "02",
  },
  {
    icon: Truck,
    title: "Carefully Delivered",
    description: "We deliver with utmost care, ensuring your treats arrive perfect.",
    step: "03",
  },
  {
    icon: PartyPopper,
    title: "Enjoy the Moment",
    description: "Unbox, indulge, and celebrate life's sweetest moments.",
    step: "04",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="From your order to your doorstep — simple and sweet"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid gap-8 md:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeInUp}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl bg-secondary">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-0.5 w-[calc(100%-5rem)] bg-border md:block" />
              )}
              <h3 className="font-heading text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
