"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { SAVED_ADDRESSES } from "@/constants";
import type { CheckoutFormData } from "@/types";

export function SavedAddresses() {
  const { watch, setValue } = useFormContext<CheckoutFormData>();
  const selectedId = watch("savedAddressId");

  const handleSelect = (id: string) => {
    setValue("savedAddressId", id);
    const addr = SAVED_ADDRESSES.find((a) => a.id === id);
    if (addr) {
      setValue("firstName", addr.firstName);
      setValue("lastName", addr.lastName);
      setValue("address", addr.address);
      setValue("apartment", addr.apartment || "");
      setValue("city", addr.city);
      setValue("state", addr.state);
      setValue("zip", addr.zip);
      setValue("phone", addr.phone);
    }
  };

  const handleAddNew = () => {
    setValue("savedAddressId", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("address", "");
    setValue("apartment", "");
    setValue("city", "");
    setValue("state", "");
    setValue("zip", "");
    setValue("phone", "");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 text-lg font-bold text-foreground">Saved Addresses</h3>
      <div className="space-y-2">
        <label
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors",
            !selectedId && "border-primary bg-primary/5"
          )}
        >
          <input
            type="radio"
            name="savedAddress"
            checked={!selectedId}
            onChange={handleAddNew}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-medium text-foreground">Add new address</span>
        </label>
        {SAVED_ADDRESSES.map((addr) => (
          <label
            key={addr.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors",
              selectedId === addr.id && "border-primary bg-primary/5"
            )}
          >
            <input
              type="radio"
              name="savedAddress"
              checked={selectedId === addr.id}
              onChange={() => handleSelect(addr.id)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
            />
            <div className="min-w-0">
              <span className="text-sm font-medium text-foreground">{addr.label}</span>
              <p className="text-xs text-muted-foreground">
                {addr.firstName} {addr.lastName}, {addr.address}
                {addr.apartment ? `, ${addr.apartment}` : ""}, {addr.city}, {addr.state} {addr.zip}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
