"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RatingStars } from "@/components/sections/RatingStars";
import { testimonials } from "@/mocks/mock-data";

import "swiper/css";
import "swiper/css/pagination";

export function CustomerTestimonials() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real reviews from happy customers"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <Quote className="mb-3 h-6 w-6 text-primary/30" />
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-secondary">
                      <Image
                        src="/images/placeholder.svg"
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <RatingStars rating={testimonial.rating} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </section>
  );
}
