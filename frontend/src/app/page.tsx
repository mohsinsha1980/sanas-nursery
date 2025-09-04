import ChoosePlantFamily from "@/components/home/choose-plant-family";
import CollectionSection from "@/components/home/collection-section";
import Gallery from "@/components/home/gallery";
import HomeBanner from "@/components/home/home-banner";
import ContactForm from "@/components/home/contact/contact";
import BestSellingProduct from "@/components/home/best-selling-product";
import Testimonials from "@/components/home/testimonial/testimonials";
import Categories from "@/components/home/catogories";
import YoutubeSection from "@/components/home/youtube-section";
import GreenChoices from "@/components/home/products";

export default function Home() {
  const plantsData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: "/site/home/products/greenchoices.webp",
    title: "Natural Plant",
  }));
  return (
    <>
      <HomeBanner />
      <Categories />
      <BestSellingProduct />
      <GreenChoices
        plants={plantsData}
        heading="Your Green Choices"
        description="Fresh, healthy plants for every space."
      />
      <CollectionSection />
      <Gallery />
      <ChoosePlantFamily />
      <Testimonials />
      <YoutubeSection />
      <ContactForm />
    </>
  );
}
