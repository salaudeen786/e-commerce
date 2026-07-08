"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cards = [
  {
    name: "Red Velvet Cake",
    price: "Rs.3000",
    image: "/images/placeholder.svg",
    right: "20%",
    top: "25%",
    delay: 0.2,
  },
  {
    name: "Espresso Blend",
    price: "Rs.2000",
    image: "/images/placeholder.svg",
    right: "20%",
    top: "75%",
    delay: 0.6,
  },
  {
    name: "Chocolate Truffles",
    price: "Rs.5000",
    image: "/images/placeholder.svg",
    right: "7%",
    top: "50%",
    delay: 1.0,
  },
];

const floatAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function HeroFloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {cards.map((card) => (
        <motion.div
          key={card.name}
          className="pointer-events-auto absolute flex items-center gap-3 rounded-2xl border border-border/50 bg-card/80 p-3 shadow-lg backdrop-blur-md"
          style={{ right: card.right, top: card.top }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: card.delay }}
        >
          <motion.div
            className="flex items-center gap-3"
            animate={floatAnimation}
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {card.name}
              </p>
              <p className="text-sm font-bold text-primary">{card.price}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
