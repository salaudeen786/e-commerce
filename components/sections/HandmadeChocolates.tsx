import { CategoryHero } from "@/components/sections/CategoryHero";
import { products } from "@/mocks/mock-data";

const chocolateCategory = {
  id: "cat-3",
  name: "Chocolates",
  slug: "chocolates",
  description:
    "Indulge in our handcrafted chocolate collection — rich truffles, creamy assortments, and fruity delights made with the finest cocoa.",
  image: "/images/category-chocolates.svg",
  productCount: 5,
};

export function HandmadeChocolates() {
  const chocolateProducts = products.filter(
    (p) => p.category.slug === "chocolates"
  );

  return (
    <CategoryHero category={chocolateCategory} products={chocolateProducts} reversed />
  );
}
