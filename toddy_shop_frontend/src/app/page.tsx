import { HeroSection } from "@/features/home/components/HeroSection";
import { DistrictExplorer } from "@/features/home/components/DistrictExplorer";
import { FeaturedBest } from "@/features/home/components/FeaturedBest";
import { InteractiveMapSection } from "@/features/home/components/InteractiveMapSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <DistrictExplorer />
            <FeaturedBest />
            <InteractiveMapSection />
        </>
    );
}
