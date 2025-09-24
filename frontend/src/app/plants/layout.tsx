import { CATEGORIES_IMG, SITE } from "@/assets";
import { getAllPlants } from "@/lib/api-routes/api-public";
import { SITE_DATA } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";
import {
  CategoryPlantsHttpResDataType,
  PlantDataType,
} from "@/lib/types/common-types";
import type { Metadata } from "next";
import Script from "next/script";

interface PlantsLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  let plantsCount = 0;
  try {
    const response = await getAllPlants({});
    const plantsData: CategoryPlantsHttpResDataType = await response.json();
    plantsCount = plantsData?.data?.total || 0;
  } catch (_error) {
    plantsCount = 0;
  }

  return {
    title:
      "Premium Plants Collection | Sanas Nursery - Wholesale Plant Supplier",
    description: `Discover our extensive collection of ${plantsCount}+ premium plants at Sanas Nursery. From fruit trees to flowering plants, we offer wholesale prices with expert care guidance. Local delivery in Pune, Maharashtra.`,
    keywords: [
      "plants",
      "plant collection",
      "wholesale plants",
      "buy plants online",
      "plant nursery",
      "plants Pune",
      "plant supplier Maharashtra",
      "wholesale plants",
      "Sanas Nursery",
      "plant supplier",
      "garden plants",
      "plant cultivation",
      "fruit trees",
      "flowering plants",
      "herbs",
      "ornamental plants",
      "shadow trees",
    ],
    authors: [{ name: "Sanas Nursery" }],
    creator: "Sanas Nursery",
    publisher: "Sanas Nursery",
    category: "Plants & Gardening",
    alternates: {
      canonical: `https://sanasnursery.com/plants`,
      languages: {
        "en-IN": `https://sanasnursery.com/plants`,
      },
    },
    openGraph: {
      title:
        "Premium Plants Collection | Sanas Nursery - Wholesale Plant Supplier",
      description: `Discover our extensive collection of ${plantsCount}+ premium plants at Sanas Nursery. From fruit trees to flowering plants, we offer wholesale prices with expert care guidance.`,
      type: "website",
      url: `https://sanasnursery.com/plants`,
      siteName: "Sanas Nursery",
      images: [
        {
          url: `https://sanasnursery.com${CATEGORIES_IMG.ALL_PLANTS}`,
          width: 1200,
          height: 630,
          alt: "Premium Plants Collection - Sanas Nursery",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Premium Plants Collection | Sanas Nursery - Wholesale Plant Supplier",
      description: `Discover our extensive collection of ${plantsCount}+ premium plants at Sanas Nursery. From fruit trees to flowering plants, we offer wholesale prices with expert care guidance.`,
      images: [`https://sanasnursery.com${CATEGORIES_IMG.ALL_PLANTS}`],
    },
  };
}

export default async function PlantsLayout({ children }: PlantsLayoutProps) {
  let plants: PlantDataType[] = [];
  let plantsCount = 0;

  try {
    const response = await getAllPlants({});
    const plantsData: CategoryPlantsHttpResDataType = await response.json();
    plants = plantsData?.data?.plants || [];
    plantsCount = plantsData?.data?.total || 0;
  } catch (_error) {
    plants = [];
    plantsCount = 0;
  }

  return (
    <>
      <Script
        id="breadcrumbs-plants"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://sanasnursery.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Plants",
              item: "https://sanasnursery.com/plants",
            },
          ],
        })}
      </Script>

      <Script
        id="collection-page-plants"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Premium Plants Collection",
          description:
            "Extensive collection of premium plants including fruit trees, flowering plants, herbs, and ornamental plants",
          url: `https://sanasnursery.com/plants`,
          mainEntity: {
            "@type": "ItemList",
            name: "All Plants Collection",
            description: `Collection of ${plantsCount}+ premium plants available at Sanas Nursery`,
            numberOfItems: plantsCount,
            itemListElement: plants
              .slice(0, 20)
              .map((plant, index: number) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Product",
                  name: plant.title,
                  description: plant.description,
                  image: getPicURL(plant.pictures?.[0]),
                  url: `https://sanasnursery.com/plants/${plant.category}/${plant.slug}/${plant._id}`,
                  brand: {
                    "@type": "Brand",
                    name: "Sanas Nursery",
                  },
                  offers: {
                    "@type": "Offer",
                    seller: {
                      "@type": "Organization",
                      name: "Sanas Nursery",
                    },
                  },
                },
              })),
          },
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
          },
        })}
      </Script>

      <Script
        id="plants-business"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GardenStore",
          name: "Sanas Nursery - Premium Plants Collection",
          description:
            "Comprehensive plant nursery in Uruli Kanchan, Pune offering wholesale plants",
          url: `https://sanasnursery.com/plants`,
          image: `https://sanasnursery.com${CATEGORIES_IMG.ALL_PLANTS}`,
          telephone: SITE_DATA.phone,
          email: SITE_DATA.EMAIL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Uruli Kanchan",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            postalCode: "412202",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 18.4814363,
            longitude: 74.1640689,
          },
          openingHoursSpecification: [
            {
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
              opens: "09:00",
              closes: "18:00",
            },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Premium Plants Collection",
            itemListElement: plants.slice(0, 5).map((plant) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: plant.title,
                description: plant.description,
                image: getPicURL(plant.pictures?.[0]),
              },
            })),
          },
        })}
      </Script>

      {children}
    </>
  );
}
