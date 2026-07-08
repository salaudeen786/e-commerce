"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  num: number;
  label: string;
}

const STEPS: Step[] = [
  { num: 1, label: "Flavor" },
  { num: 2, label: "Weight" },
  { num: 3, label: "Shape" },
  { num: 4, label: "Sponge" },
  { num: 5, label: "Cream" },
  { num: 6, label: "Filling" },
  { num: 7, label: "Decoration" },
  { num: 8, label: "Color Theme" },
  { num: 9, label: "Cake Topper" },
  { num: 10, label: "Upload Image" },
  { num: 11, label: "Cake Message" },
  { num: 12, label: "Delivery Date" },
  { num: 13, label: "Delivery Time" },
  { num: 14, label: "Review" },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: Set<number>;
}

export function StepIndicator({
  currentStep,
  onStepClick,
  completedSteps,
}: StepIndicatorProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-start gap-0 px-1">
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.num;
          const isCompleted = completedSteps.has(step.num);
          const isClickable = isCompleted || step.num < currentStep;

          return (
            <div key={step.num} className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick(step.num)}
                disabled={!isClickable}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all",
                  isClickable ? "cursor-pointer" : "cursor-default"
                )}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors sm:h-9 sm:w-9",
                    isActive && "bg-primary text-primary-foreground ring-2 ring-primary/30",
                    isCompleted && !isActive && "bg-primary/20 text-primary",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.num}
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] leading-tight sm:text-xs",
                    isActive && "font-semibold text-primary",
                    isCompleted && "text-primary",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 mt-4 h-px w-6 sm:w-10",
                    completedSteps.has(step.num)
                      ? "bg-primary/40"
                      : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { STEPS };
