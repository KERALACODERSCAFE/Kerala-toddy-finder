import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedShops } from "@/components/home/FeaturedShops";
import { DistrictExplorer } from "@/components/home/DistrictExplorer";
import { SignatureFlavors } from "@/components/home/SignatureFlavors";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedShops />
      <DistrictExplorer />
      <SignatureFlavors />
      <HowItWorks />
      <CTASection />
    </>
  );
}
