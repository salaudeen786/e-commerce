"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { blogPosts } from "@/mocks/mock-data";

export function BlogPreview() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="From Our Blog"
          subtitle="Tips, stories, and sweet inspiration"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              className="group overflow-hidden rounded-2xl bg-card transition-shadow hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="mt-2 font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/blog"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Posts
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
