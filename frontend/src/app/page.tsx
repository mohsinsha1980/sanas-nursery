import ChoosePlantFamily from "@/components/home/choose-plant-family";
import CollectionSection from "@/components/home/collection-section";
import Gallery from "@/components/home/gallery";
import HomeBanner from "@/components/home/home-banner";
import GreenChoices from "@/components/home/products";
import YoutubeSection from "@/components/home/youtube-section";
const plantsData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: "/site/home/products/greenchoices.webp",
  title: "Natural Plant",
}));

export default function Home() {
  return (
    <>
      <HomeBanner />
      <ChoosePlantFamily />
      <GreenChoices
        plants={plantsData}
        heading="Your Green Choices"
        description="Fresh, healthy plants for every space."
      />
      <CollectionSection />
      <Gallery />
      <YoutubeSection />
    </>
  );
}
