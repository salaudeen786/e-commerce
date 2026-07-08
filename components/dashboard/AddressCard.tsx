"use client";

import { MapPin, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { SavedAddress } from "@/types";

interface AddressCardProps {
  address: SavedAddress;
  isDefault?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, isDefault, onEdit, onDelete }: AddressCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-xl border border-border bg-card p-4"
    >
      {isDefault && (
        <span className="absolute right-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          Default
        </span>
      )}
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
        <MapPin className="h-4 w-4" />
      </div>
      <p className="text-sm font-semibold text-foreground">{address.label}</p>
      <p className="text-xs text-muted-foreground">
        {address.firstName} {address.lastName}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {address.address}
        {address.apartment && `, ${address.apartment}`}
      </p>
      <p className="text-xs text-muted-foreground">
        {address.city}, {address.state} {address.zip}
      </p>
      <p className="text-xs text-muted-foreground">{address.phone}</p>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={onEdit} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-7")} aria-label="Edit address">
          <Edit className="h-3.5 w-3.5" />
        </button>
        <button onClick={onDelete} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-7 text-muted-foreground hover:text-destructive")} aria-label="Delete address">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
