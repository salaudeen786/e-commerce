"use client";

import { useFormContext } from "react-hook-form";
import { US_STATES } from "@/constants";
import type { CheckoutFormData } from "@/types";

export function DeliveryAddressForm() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormData>();

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 text-lg font-bold text-foreground">Delivery Address</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">First Name *</label>
          <input {...register("firstName")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Last Name *</label>
          <input {...register("lastName")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
          <input type="email" {...register("email")} placeholder="sarah@example.com" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Phone *</label>
          <input type="tel" {...register("phone")} placeholder="(212) 555-0147" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">Address *</label>
          <input {...register("address")} placeholder="123 Maple Street" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Apartment / Suite</label>
          <input {...register("apartment")} placeholder="Apt 4B" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">City *</label>
          <input {...register("city")} placeholder="New York" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">State *</label>
          <select {...register("state")} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">ZIP Code *</label>
          <input {...register("zip")} placeholder="10001" maxLength={10} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          {errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip.message}</p>}
        </div>
      </div>
    </div>
  );
}
