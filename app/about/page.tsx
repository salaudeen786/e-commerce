"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Leaf, Sparkles, Users, ArrowRight, Award, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { CustomerTestimonials } from "@/components/sections/CustomerTestimonials";
import { teamMembers, companyStats, companyValues } from "@/mocks/mock-data";
import { SITE_NAME } from "@/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, staggerChildren: 0.1 },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-6 w-6" />,
  Leaf: <Leaf className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary to-accent/20 pb-16 pt-12 md:pb-24 md:pt-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Our Story
              </span>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Crafting Sweet{" "}
                <span className="text-primary">Moments</span> Since 2018
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                What started as a small home bakery has grown into a beloved destination for premium
                handcrafted cakes, artisanal coffees, and luxury chocolates. Every creation tells a
                story of passion, quality, and the joy of bringing people together.
              </p>
              <Link
                href="/shop"
                className={buttonVariants({ variant: "default", size: "lg", className: "mt-6" })}
              >
                Explore Our Collection
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-3xl bg-muted shadow-xl">
                <Image src="/images/placeholder.svg" alt="Sweet Moments Bakery" fill className="object-cover" sizes="500px" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
                <p className="text-3xl font-bold text-primary">8+</p>
                <p className="text-xs text-muted-foreground">Years of Excellence</p>
              </div>
              <div className="absolute -right-4 -top-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
                <Award className="h-6 w-6 text-primary" />
                <p className="text-xs font-medium text-foreground">Award Winning</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {companyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5 text-center"
              >
                <p className="font-heading text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}{stat.suffix}
                </p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <SectionHeading
            title="What We Stand For"
            subtitle="Our values guide everything we do, from sourcing ingredients to serving our community."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {ICON_MAP[value.icon]}
                </div>
                <h3 className="text-lg font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Meet Our Team"
            subtitle="The passionate people behind every Sweet Moments creation."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-muted">
                  <Image src={member.image} alt={member.name} width={80} height={80} className="h-full w-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-xs font-medium text-primary">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-accent/20 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading
                title="Ready to Create Your Sweet Moment?"
                subtitle="Browse our collection of handcrafted treats and find the perfect addition to your next celebration."
              />
              <Link
                href="/shop"
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                Shop Now
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CustomerTestimonials />
    </div>
  );
}
