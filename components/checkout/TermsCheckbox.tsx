"use client";

import { useFormContext } from "react-hook-form";
import Link from "next/link";
import type { CheckoutFormData } from "@/types";

export function TermsCheckbox() {
  const { register, formState: { errors } } = useFormContext<CheckoutFormData>();

  return (
    <div>
      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          {...register("acceptedTerms")}
          className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
        />
        <span className="text-sm text-muted-foreground">
          I accept the{" "}
          <Link href="/terms" className="text-primary underline-offset-2 hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors.acceptedTerms && (
        <p className="mt-1 text-xs text-destructive">{errors.acceptedTerms.message}</p>
      )}
    </div>
  );
}
