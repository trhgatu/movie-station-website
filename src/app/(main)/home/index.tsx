import { BannerSection } from "./components/Banner/banner-section";
import { PopularSection } from "./components/Popular/popular-section";
import { UpcomingSection } from "./components/Upcoming/upcoming-section";

export function HomePage() {
    return (
        <div className="w-full">
            <BannerSection/>
            <UpcomingSection/>
            <PopularSection/>
        </div>
    );
}