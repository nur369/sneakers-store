import Hero from "../components/Hero";
import { VelocityScroll } from "../components/eldoraui/scrollbasedvelocity";
import Trending from "@/components/Trending";
import PremiumSection from "@/components/PremiumSection";


export const metadata = {
  title: "Nike Store - Home",
  description: "Shop the latest Nike shoes with fast delivery",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <VelocityScroll
          text="Flash Sale — Limited Time — Up to 70% OFF — Shop Now — Hurry Up New Collection — Premium Quality — Free Shipping — Shop The Trend"
          default_velocity={1}
          className="text-2xl font-semibold"
        />
        <Trending/>
        <PremiumSection/>
    </main>
  );
}
