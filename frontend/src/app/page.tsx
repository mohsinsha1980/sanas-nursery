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
import { SITE_DATA } from "@/lib/constants";
import { HomeData } from "@/lib/types/public-types";
import Script from "next/script";

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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sanas Nursery",
    url: "https://sanasnursery.com/",
    description:
      "One stop shop for all your nursery needs - Wholesale plant supplier in Uruli Kanchan, Maharashtra",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Sanas Nursery",
      url: "https://sanasnursery.com",
      logo: {
        "@type": "ImageObject",
        url: "https://sanasnursery.com/images/site/sanas-nursery.webp",
        width: 200,
        height: 200,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_DATA.phone,
        email: SITE_DATA.EMAIL,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "mr"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Uruli Kanchan",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "412202",
        addressCountry: "IN",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sanasnursery.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <HomeBanner />
      <Categories />

      {homeData?.bestSellingPlants?.length > 0 ? (
        homeData?.bestSellingPlants?.length < 3 ? (
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
