import { HERO, SITE } from "@/assets";
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
import type { Metadata } from "next";
import { getPicURL } from "@/lib/helper";

async function getHomeDataServer() {
  try {
    const response = await getPublicHomeData();
    const resData = await response.json();
    return resData.data;
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

export const metadata: Metadata = {
  title: "Sanas Nursery | Wholesale Plant Nursery in Uruli Kanchan Pune",
  description:
    "Sanas Nursery - Wholesale plant nursery in Uruli Kanchan, Pune. Fruit trees, flowering, shadow & masala plants with expert care & bulk delivery.",
  keywords: [
    "wholesale plant nursery",
    "plant nursery Pune",
    "fruit trees Maharashtra",
    "flowering plants Uruli Kanchan",
    "shadow trees wholesale",
    "masala plants",
    "plant supplier Pune",
    "nursery plants Maharashtra",
    "bulk plant orders",
    "plant consultation",
  ],
  alternates: {
    canonical: "https://sanasnursery.com/",
  },
  openGraph: {
    type: "website",
    url: "https://sanasnursery.com/",
    siteName: "Sanas Nursery",
    title: "Premium Wholesale Plants in Uruli Kanchan Pune | Sanas Nursery",
    description:
      "Discover high-quality fruit trees, flowering & shadow plants from Sanas Nursery in Uruli Kanchan, Pune. Bulk orders & expert advice available!",
    images: [
      {
        url: HERO.HOME.H1,
        width: 1200,
        height: 630,
        alt: "Premium Plants from Sanas Nursery",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Wholesale Plants in Uruli Kanchan Pune | Sanas Nursery",
    description:
      "Discover high-quality fruit trees, flowering & shadow plants from Sanas Nursery in Uruli Kanchan, Pune. Bulk orders & expert advice available!",
    images: [HERO.HOME.H1, HERO.HOME.H2, HERO.HOME.H3, HERO.HOME.H4],
  },
};

export default async function Home() {
  const homeData: HomeData = await getHomeDataServer();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sanas Nursery",
    url: "https://sanasnursery.com/",
    description:
      "Sanas Nursery – Wholesale plant nursery in Uruli Kanchan, Pune. Fruit trees, flowering, shadow & masala plants with expert care & bulk delivery",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Sanas Nursery",
      url: "https://sanasnursery.com",
      logo: {
        "@type": "ImageObject",
        url: SITE.SEO_LOGO,
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

  const productsSchema =
    homeData?.bestSellingPlants?.map((plant) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: plant.title,
      image: getPicURL(plant.pictures[0]) || HERO.HOME.H1,
      description:
        plant.metaDescription || "High-quality plant from Sanas Nursery",
      brand: { "@type": "Brand", name: "Sanas Nursery" },
      offers: {
        "@type": "Offer",
        url: `/plants/${plant.category}/${plant.slug}/${plant._id}`,
      },
    })) || [];

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {productsSchema.length > 0 && (
        <Script
          id="products-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
        />
      )}

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
