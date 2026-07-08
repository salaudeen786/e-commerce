"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSkip?: () => void;
  isSubmitting: boolean;
}

const OPTIONAL_STEPS = new Set([9, 10, 11]);

export function NavigationButtons({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSkip,
  isSubmitting,
}: NavigationButtonsProps) {
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;
  const isOptional = OPTIONAL_STEPS.has(currentStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-4"
    >
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={isFirst}
        className={cn(isFirst && "invisible")}
      >
        <ChevronLeft className="mr-1.5 h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {isOptional && onSkip && (
          <Button variant="ghost" onClick={onSkip} type="button">
            Skip
          </Button>
        )}
        <Button onClick={onNext} disabled={isSubmitting}>
          {isLast ? (
            <>
              <Sparkles className="mr-1.5 h-4 w-4" />
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </>
          ) : (
            <>
              Next
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
