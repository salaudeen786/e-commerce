"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { instagramPosts } from "@/mocks/mock-data";

export function InstagramGallery() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Follow Us on Instagram"
          subtitle="@sweetmoments — Tag us in your sweet moments"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6"
        >
          {instagramPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <div className="flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Heart className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">
                      {post.likes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Camera className="h-4 w-4" />
            Follow us @sweetmoments
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
