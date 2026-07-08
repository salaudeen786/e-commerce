"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductOptions } from "@/components/product/ProductOptions";
import { CakeCustomizer } from "@/components/product/CakeCustomizer";
import { DeliveryPicker } from "@/components/product/DeliveryPicker";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { PriceCalculator } from "@/components/product/PriceCalculator";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WishlistButton } from "@/components/product/WishlistButton";
import { ShareProduct } from "@/components/product/ShareProduct";
import { DeliveryInfo } from "@/components/product/DeliveryInfo";
import { ReturnPolicy } from "@/components/product/ReturnPolicy";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ReviewForm } from "@/components/product/ReviewForm";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { FrequentlyBoughtTogether } from "@/components/product/FrequentlyBoughtTogether";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";
import { getProductBySlug, calculateTotalPrice } from "@/mocks/product-utils";
import { productReviews, productFAQs } from "@/mocks/mock-data";
import { useCartStore } from "@/store/cart-store";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { CartItemCustomizations } from "@/types";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  const addItem = useCartStore((s) => s.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(
    product?.flavor ?? null
  );
  const [selectedWeight, setSelectedWeight] = useState<string | null>(
    product?.weight ?? null
  );
  const [cakeMessage, setCakeMessage] = useState("");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  if (!product) {
    notFound();
  }

  const reviews = productReviews[product.id] || [];
  const faqs = productFAQs[product.id] || [];

  const totalPrice = useMemo(
    () => calculateTotalPrice(product.price, selectedWeight ?? undefined, cakeMessage.length > 0, false),
    [product.price, selectedWeight, cakeMessage]
  );

  const handleAddToCart = () => {
    const customizations: CartItemCustomizations = {
      flavor: selectedFlavor ?? undefined,
      weight: selectedWeight ?? undefined,
      cakeMessage: cakeMessage || undefined,
      customImage: customImage ?? undefined,
      deliveryDate: deliveryDate || undefined,
      deliveryTime: deliveryTime || undefined,
    };
    addItem(product, quantity, customizations);
  };

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    {
      label: product.category.name,
      href: `/shop?category=${product.category.slug}`,
    },
    { label: product.name },
  ];

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/product/${product.slug}`
      : "";

  return (
    <>
      <section className="bg-gradient-to-b from-secondary/30 to-background pb-8 pt-28">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ImageGallery
              images={product.images}
              productName={product.name}
              className="lg:sticky lg:top-28 lg:self-start"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <ProductInfo product={product} />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <ProductOptions
                  selectedFlavor={selectedFlavor}
                  selectedWeight={selectedWeight}
                  onFlavorChange={setSelectedFlavor}
                  onWeightChange={setSelectedWeight}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <CakeCustomizer
                  message={cakeMessage}
                  onMessageChange={setCakeMessage}
                  customImage={customImage}
                  onImageChange={setCustomImage}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <DeliveryPicker
                  date={deliveryDate}
                  time={deliveryTime}
                  onDateChange={setDeliveryDate}
                  onTimeChange={setDeliveryTime}
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-4"
              >
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                />
                <AddToCartButton onClick={handleAddToCart} />
                <WishlistButton product={product} />
              </motion.div>

              <PriceCalculator
                basePrice={product.price}
                weight={selectedWeight}
                hasMessage={cakeMessage.length > 0}
                quantity={quantity}
              />

              <ShareProduct productName={product.name} url={shareUrl} />

              <div className="grid gap-4 sm:grid-cols-2">
                <DeliveryInfo />
                <ReturnPolicy />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <ProductReviews productId={product.id} mockReviews={reviews} />
            <div className="space-y-8">
              {faqs.length > 0 && <ProductFAQ faqs={faqs} />}
              <ReviewForm productId={product.id} />
            </div>
          </div>
        </Container>
      </section>

      <FrequentlyBoughtTogether product={product} />
      <RelatedProducts product={product} />
      <RecentlyViewed currentProductSlug={product.slug} />

      <StickyAddToCart
        price={totalPrice}
        comparePrice={product.comparePrice}
        onAddToCart={handleAddToCart}
        quantity={quantity}
        onQuantityChange={setQuantity}
        inStock={product.inStock}
      />
    </>
  );
}
