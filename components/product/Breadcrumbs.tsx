"use client";

import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", className)}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-primary"
      >
        <House className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}
