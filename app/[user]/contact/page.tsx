"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ChevronDown, Send, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const CONTACT_INFO = [
  { icon: MapPin, label: "Visit Us", value: "123 Baker's Lane, New York, NY 10001", desc: "Come say hello at our flagship store" },
  { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567", desc: "Mon–Sat, 8am–8pm EST" },
  { icon: Mail, label: "Email Us", value: "hello@sweetmoments.com", desc: "We reply within 24 hours" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 8am–8pm", desc: "Sunday: 10am–6pm" },
];

const FAQS = [
  { q: "How do I place an order?", a: "Browse our shop, add items to your cart, and proceed to checkout. You can create an account or checkout as a guest." },
  { q: "What is your delivery area?", a: "We deliver within a 50-mile radius of New York City. Same-day delivery is available in Manhattan and Brooklyn." },
  { q: "Do you accommodate dietary restrictions?", a: "Yes! We offer gluten-free, vegan, and nut-free options for many of our products. Check individual product pages for details." },
  { q: "Can I customize a cake?", a: "Absolutely! Use our Cake Customizer to design a cake that's perfect for your occasion. Choose flavors, fillings, decorations, and more." },
  { q: "What is your cancellation policy?", a: "Orders can be modified or cancelled within 1 hour of placement. Customized orders have a 24-hour cancellation window." },
  { q: "Do you offer corporate gifting?", a: "Yes, we have a dedicated corporate gifting program with volume discounts and custom branding options. Contact us for details." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-24 md:pt-28">
      <section className="bg-gradient-to-b from-secondary/30 to-background pb-8 pt-12 md:pt-16">
        <Container>
          <SectionHeading
            title="Get in Touch"
            subtitle="Have a question, suggestion, or just want to say hello? We'd love to hear from you."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5 text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{info.label}</h3>
                <p className="mt-1 text-sm text-foreground">{info.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Send Us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {submitted ? (
                    <><Check className="h-4 w-4" /> Message Sent!</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Find Us</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Visit our flagship store in the heart of New York City.
              </p>
              <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-accent/30">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 text-sm font-medium text-foreground">123 Baker's Lane</p>
                    <p className="text-xs text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions. Can't find what you're looking for? Drop us a message!"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-border last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground transition-colors hover:text-primary md:text-base"
                  >
                    {faq.q}
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", openFaq === i && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-3 text-sm text-muted-foreground">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-accent/20 p-8 text-center md:p-12">
            <SectionHeading
              title="Join Our Newsletter"
              subtitle="Stay in the loop! Get exclusive offers, new product announcements, and sweet inspiration delivered to your inbox."
            />
            <form className="mx-auto flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
