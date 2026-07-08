"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unused and in their original packaging. Customized items are non-returnable unless damaged." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. We also offer same-day delivery in select areas." },
  { q: "Do you offer international shipping?", a: "Currently we ship within the United States and select international destinations. International orders typically arrive within 10-14 business days." },
  { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. After that, they enter processing and cannot be changed." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also view tracking in your order history on the dashboard." },
  { q: "Do you offer gift wrapping?", a: "Yes! We offer premium gift wrapping for $4.99 per item. You can add a personalized message during checkout." },
];

const CONTACT_OPTIONS = [
  { icon: MessageCircle, label: "Live Chat", desc: "Chat with our team", action: "Start Chat", available: true },
  { icon: Phone, label: "Phone Support", desc: "Call us anytime", action: "+1 (555) 123-4567", available: true },
  { icon: Mail, label: "Email Us", desc: "We reply within 24h", action: "hello@sweetmoments.com", available: true },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Support</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {CONTACT_OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <opt.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">{opt.label}</p>
            <p className="mb-3 text-xs text-muted-foreground">{opt.desc}</p>
            <span className="text-xs font-medium text-primary">{opt.action}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Frequently Asked Questions</h3>
        <div className="space-y-1">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {faq.q}
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", openFaq === i && "rotate-180")} />
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="mb-1 text-sm font-semibold text-foreground">Send Us a Message</h3>
        <p className="mb-4 text-xs text-muted-foreground">We'll get back to you within 24 hours.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Name</label>
            <input value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Email</label>
            <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-foreground">Subject</label>
            <input value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-foreground">Message</label>
            <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={4} className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
        </div>
        <button className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Send Message
        </button>
      </motion.div>
    </div>
  );
}
