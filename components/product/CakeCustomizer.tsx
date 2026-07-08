"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CakeCustomizerProps {
  message: string;
  onMessageChange: (message: string) => void;
  customImage: string | null;
  onImageChange: (image: string | null) => void;
  className?: string;
}

export function CakeCustomizer({
  message,
  onMessageChange,
  customImage,
  onImageChange,
  className,
}: CakeCustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className={cn("space-y-4", className)}
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Cake Message{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          maxLength={100}
          rows={3}
          placeholder="Write a personal message for the cake..."
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {message.length}/100
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Upload Reference Image{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {customImage ? (
          <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-xl bg-muted">
            <Image
              src={customImage}
              alt="Uploaded reference"
              fill
              className="object-cover"
              sizes="320px"
            />
            <button
              onClick={() => onImageChange(null)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/50 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Upload className="h-5 w-5" />
            Click to upload an image
          </button>
        )}
      </div>
    </motion.div>
  );
}
