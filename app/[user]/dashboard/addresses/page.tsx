"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { AddressCard } from "@/components/dashboard/AddressCard";
import { Button } from "@/components/ui/button";

export default function AddressesPage() {
  const addresses = useDashboardStore((s) => s.savedAddresses);
  const removeAddress = useDashboardStore((s) => s.removeAddress);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Addresses</h1>
        <Button size="sm">
          <Plus className="mr-1 h-3.5 w-3.5" /> Add Address
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((addr, i) => (
          <motion.div key={addr.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <AddressCard
              address={addr}
              isDefault={i === 0}
              onEdit={() => {}}
              onDelete={() => removeAddress(addr.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
