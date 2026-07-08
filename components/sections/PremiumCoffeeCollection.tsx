import { CategoryHero } from "@/components/sections/CategoryHero";
import { products } from "@/mocks/mock-data";

const coffeeCategory = {
  id: "cat-2",
  name: "Coffee",
  slug: "coffee",
  description:
    "Discover our artisanal coffee collection — from bold espressos to smooth cold brews, every cup is crafted for perfection.",
  image: "/images/category-coffee.svg",
  productCount: 4,
};

export function PremiumCoffeeCollection() {
  const coffeeProducts = products.filter(
    (p) => p.category.slug === "coffee"
  );

  return <CategoryHero category={coffeeCategory} products={coffeeProducts} />;
}
