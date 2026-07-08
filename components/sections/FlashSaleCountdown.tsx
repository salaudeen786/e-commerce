"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Timer, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/sections/ProductCard";
import { products } from "@/mocks/mock-data";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-2xl font-bold text-foreground md:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function CountdownTimer({ target }: { target: Date }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const diff = target.getTime() - Date.now();
    setTimeLeft(diff > 0 ? diff : 0);

    const interval = setInterval(() => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <CountdownUnit value={days} label="Days" />
      <span className="mt-[-1rem] text-2xl font-bold text-muted-foreground/40">
        :
      </span>
      <CountdownUnit value={hours} label="Hours" />
      <span className="mt-[-1rem] text-2xl font-bold text-muted-foreground/40">
        :
      </span>
      <CountdownUnit value={minutes} label="Mins" />
      <span className="mt-[-1rem] text-2xl font-bold text-muted-foreground/40">
        :
      </span>
      <CountdownUnit value={seconds} label="Secs" />
    </div>
  );
}

export function FlashSaleCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(23, 59, 59, 0);

  const flashItems = products.filter((p) => p.comparePrice).slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary to-accent/10 py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">
              Limited Time Offer
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Flash Sale
          </h2>
          <p className="text-base text-muted-foreground">
            Hurry! These deals won't last long
          </p>
          <CountdownTimer target={targetDate} />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashItems.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/shop?deals=sale"
            className={buttonVariants({ variant: "default" })}
          >
            Shop Flash Sale
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
