import { HeroSection } from "@/components/sections/HeroSection";
import { HeroFloatingCards } from "@/components/sections/HeroFloatingCards";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { FeaturedCategoriesGrid } from "@/components/sections/FeaturedCategoriesGrid";
import { BestSellingCakes } from "@/components/sections/BestSellingCakes";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { PremiumCoffeeCollection } from "@/components/sections/PremiumCoffeeCollection";
import { HandmadeChocolates } from "@/components/sections/HandmadeChocolates";
import { ComboDeals } from "@/components/sections/ComboDeals";
import { CustomizeYourCakeBanner } from "@/components/sections/CustomizeYourCakeBanner";
import { SeasonalOffers } from "@/components/sections/SeasonalOffers";
import { FlashSaleCountdown } from "@/components/sections/FlashSaleCountdown";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CustomerTestimonials } from "@/components/sections/CustomerTestimonials";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <HeroSection />
        <HeroFloatingCards />
      </div>
      <TrustBadges />
      <ShopByCategory />
      <FeaturedCategoriesGrid />
      <BestSellingCakes />
      <NewArrivals />
      <PremiumCoffeeCollection />
      <HandmadeChocolates />
      <ComboDeals />
      <CustomizeYourCakeBanner />
      <SeasonalOffers />
      <FlashSaleCountdown />
      <WhyChooseUs />
      <HowItWorks />
      <CustomerTestimonials />
      <InstagramGallery />
      <BlogPreview />
      <NewsletterSection />
    </>
  );
}
