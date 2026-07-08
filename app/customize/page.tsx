"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CustomizerWizard } from "@/components/customizer/CustomizerWizard";

export default function CustomizePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-secondary/30 to-background pb-6 pt-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Design Your Dream Cake
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Customize every detail — from flavor to decoration — and our master
              bakers will bring your vision to life.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-8 pb-24">
        <Container>
          <CustomizerWizard />
        </Container>
      </section>
    </>
  );
}
