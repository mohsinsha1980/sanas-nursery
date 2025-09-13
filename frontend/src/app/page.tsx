import BestSellProdCards from "@/components/home/best-sellinh-product";
import Categories from "@/components/home/catogories";
import Contact from "@/components/home/contact/contact";
import BestSellingProduct from "@/components/home/corousel/best-selling-product";
import HomeGallerySection from "@/components/home/gallery";
import HomeBanner from "@/components/home/home-banner";
import HomeCardsSection from "@/components/home/home-card-section";
import GreenChoices from "@/components/home/public-green-choices";
import Testimonials from "@/components/home/testimonial/testimonials";
import YoutubeSection from "@/components/home/youtube-section";
import { getPublicHomeData } from "@/lib/api-routes/api-public";
import { HomeData } from "@/lib/types/public-types";

async function getHomeDataServer() {
  try {
    const response = await getPublicHomeData();
    return response.data.data;
  } catch (_error) {
    return {
      greenChoices: [],
      cards: {},
      gallery: {},
      videos: [],
      testimonials: [],
      bestSellingPlants: [],
    };
  }
}

export default async function Home() {
  const homeData: HomeData = await getHomeDataServer();

  return (
    <>
      <HomeBanner />
      <Categories />

      {homeData?.bestSellingPlants?.length > 0 ? (
        homeData?.bestSellingPlants?.length > 3 ? (
          <BestSellProdCards plants={homeData.bestSellingPlants} />
        ) : (
          <BestSellingProduct plants={homeData.bestSellingPlants} />
        )
      ) : null}

      {homeData?.greenChoices?.length > 0 && (
        <GreenChoices plants={homeData.greenChoices} />
      )}

      <HomeCardsSection cards={homeData.cards} />
      <HomeGallerySection gallery={homeData.gallery} />
      {homeData.testimonials.length > 0 && (
        <Testimonials testimonials={homeData.testimonials} />
      )}
      <YoutubeSection videos={homeData.videos} />
      <Contact />
    </>
  );
}
