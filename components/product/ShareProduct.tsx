"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Check, Globe, Camera, ExternalLink } from "lucide-react";

interface ShareProductProps {
  productName: string;
  url: string;
}

export function ShareProduct({ productName, url }: ShareProductProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <label className="mb-2 block text-sm font-semibold text-foreground">
        Share
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Link className="h-4 w-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>
        <a
          href={`mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(`Check out ${productName}: ${url}`)}`}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Share via email"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Share on Facebook"
        >
          <Camera className="h-4 w-4" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${productName}`)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Share on Twitter"
        >
          <Globe className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
