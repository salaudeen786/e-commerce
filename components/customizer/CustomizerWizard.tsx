"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cakeCustomizerSchema } from "@/lib/schemas";
import { STEPS } from "@/components/customizer/StepIndicator";
import { StepIndicator } from "@/components/customizer/StepIndicator";
import { NavigationButtons } from "@/components/customizer/NavigationButtons";
import { CakePreview } from "@/components/customizer/CakePreview";
import { PriceSummary } from "@/components/customizer/PriceSummary";
import { StepFlavor } from "@/components/customizer/StepFlavor";
import { StepWeight } from "@/components/customizer/StepWeight";
import { StepShape } from "@/components/customizer/StepShape";
import { StepSponge } from "@/components/customizer/StepSponge";
import { StepCream } from "@/components/customizer/StepCream";
import { StepFilling } from "@/components/customizer/StepFilling";
import { StepDecoration } from "@/components/customizer/StepDecoration";
import { StepColorTheme } from "@/components/customizer/StepColorTheme";
import { StepCakeTopper } from "@/components/customizer/StepCakeTopper";
import { StepUploadImage } from "@/components/customizer/StepUploadImage";
import { StepCakeMessage } from "@/components/customizer/StepCakeMessage";
import { StepDelivery } from "@/components/customizer/StepDelivery";
import { StepReview } from "@/components/customizer/StepReview";
import type { CakeCustomizerData } from "@/types";

const STEP_FIELDS: Record<number, (keyof CakeCustomizerData)[]> = {
  1: ["flavor"],
  2: ["weight"],
  3: ["shape"],
  4: ["sponge"],
  5: ["cream"],
  6: ["filling"],
  7: ["decoration"],
  8: ["colorTheme"],
  12: ["deliveryDate"],
  13: ["deliveryTime"],
};

const OPTIONAL_STEPS = new Set([9, 10, 11]);
const TOTAL_STEPS = 14;

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const defaultValues: CakeCustomizerData = {
  flavor: "",
  weight: "",
  shape: "",
  sponge: "",
  cream: "",
  filling: "",
  decoration: "",
  colorTheme: "",
  cakeTopper: "",
  referenceImage: "",
  cakeMessage: "",
  deliveryDate: "",
  deliveryTime: "",
};

export function CustomizerWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CakeCustomizerData>({
    resolver: zodResolver(cakeCustomizerSchema),
    defaultValues,
    mode: "onChange",
  });

  const markCompleted = useCallback((step: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(step);
      return next;
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }, [currentStep]);

  const handleNext = useCallback(async () => {
    const fields = STEP_FIELDS[currentStep];
    if (fields) {
      const output = await form.trigger(fields);
      if (!output) return;
    }
    markCompleted(currentStep);
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 1500));
      setIsSubmitting(false);
      setShowSuccess(true);
    }
  }, [currentStep, form, markCompleted, goToStep]);

  const handleSkip = useCallback(() => {
    if (currentStep === 9) form.setValue("cakeTopper", "none");
    if (currentStep === 10) form.setValue("referenceImage", "");
    if (currentStep === 11) form.setValue("cakeMessage", "");
    markCompleted(currentStep);
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, form, markCompleted, goToStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const handleStepClick = useCallback((step: number) => {
    if (step < currentStep || completedSteps.has(step)) {
      goToStep(step);
    }
  }, [currentStep, completedSteps, goToStep]);

  const renderStep = useMemo(() => {
    switch (currentStep) {
      case 1: return <StepFlavor />;
      case 2: return <StepWeight />;
      case 3: return <StepShape />;
      case 4: return <StepSponge />;
      case 5: return <StepCream />;
      case 6: return <StepFilling />;
      case 7: return <StepDecoration />;
      case 8: return <StepColorTheme />;
      case 9: return <StepCakeTopper />;
      case 10: return <StepUploadImage />;
      case 11: return <StepCakeMessage />;
      case 12: return <StepDelivery />;
      case 13: return <StepDelivery />;
      case 14: return <StepReview />;
      default: return null;
    }
  }, [currentStep]);

  const currentStepData = STEPS[currentStep - 1];

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
        >
          <Sparkles className="h-10 w-10 text-emerald-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground">Order Placed! 🎉</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Your custom cake order has been received. Our master bakers will start working on it soon!
        </p>
      </motion.div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <p className="mb-1 text-sm text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
            <StepIndicator
              currentStep={currentStep}
              onStepClick={handleStepClick}
              completedSteps={completedSteps}
            />
          </div>

          <div className="min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderStep}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onPrev={handlePrev}
              onNext={handleNext}
              onSkip={OPTIONAL_STEPS.has(currentStep) ? handleSkip : undefined}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        <div className="w-full shrink-0 space-y-4 lg:w-80">
          <div className="lg:sticky lg:top-28">
            <CakePreview />
            <div className="mt-4">
              <PriceSummary />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
