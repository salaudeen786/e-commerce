"use client";

import { useRef } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import type { CakeCustomizerData } from "@/types";

export function StepUploadImage() {
  const { setValue, watch } = useFormContext<CakeCustomizerData>();
  const value = watch("referenceImage") || "";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setValue("referenceImage", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Upload Reference Image</h3>
      <p className="mb-6 text-muted-foreground">Share a photo as inspiration (optional)</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {value ? (
        <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-2xl bg-muted">
          <Image src={value} alt="Reference" fill className="object-cover" sizes="320px" />
          <button
            onClick={() => setValue("referenceImage", "")}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/50 px-6 py-12 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Upload className="h-8 w-8" />
          <div className="text-left">
            <p className="text-base font-semibold">Click to upload</p>
            <p className="text-sm">JPG, PNG, or WEBP up to 5MB</p>
          </div>
        </button>
      )}
    </div>
  );
}
