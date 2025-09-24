import { SITE } from "@/assets";
import { getCategoryPlants } from "@/lib/api-routes/api-public";
import { CATEGORIES, SITE_DATA } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";
import {
  CategoryPlantsHttpResDataType,
  PlantDataType,
} from "@/lib/types/common-types";
import type { Metadata } from "next";
import Script from "next/script";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryLayoutProps): Promise<Metadata> {
  const { category } = await params;

  const categoryKey = Object.keys(CATEGORIES).find(
    (key) => CATEGORIES[key as keyof typeof CATEGORIES].value === category
  );

  if (categoryKey) {
    const categoryData = CATEGORIES[categoryKey as keyof typeof CATEGORIES];
    let plantsCount = 0;
    try {
      const response = await getCategoryPlants(category, {});
      const plantsData = await response.json();
      plantsCount = plantsData?.data?.total || 0;
    } catch (_error) {
      plantsCount = 0;
    }

    return {
      title: `${categoryData.seoTitle} | Sanas Nursery`,
      description: `${
        categoryData.seoDescription
      } Browse ${plantsCount}+ ${categoryData.label.toLowerCase()} at Sanas Nursery. Expert care, competitive prices, local delivery.`,
      keywords: [
        categoryData.label.toLowerCase(),
        `${categoryData.label.toLowerCase()} plants`,
        `${categoryData.label.toLowerCase()} wholesale`,
        `buy ${categoryData.label.toLowerCase()}`,
        `${categoryData.label.toLowerCase()} nursery`,
        `${categoryData.label.toLowerCase()} Pune`,
        "plant nursery Maharashtra",
        "wholesale plants",
        "Sanas Nursery",
        "plant supplier",
        "garden plants",
        "plant cultivation",
      ],
      authors: [{ name: "Sanas Nursery" }],
      creator: "Sanas Nursery",
      publisher: "Sanas Nursery",
      category: "Plants & Gardening",
      alternates: {
        canonical: `https://sanasnursery.com/plants/${categoryData.value}`,
        languages: {
          "en-IN": `https://sanasnursery.com/plants/${categoryData.value}`,
        },
      },
      openGraph: {
        title: `${categoryData.seoTitle} | Sanas Nursery`,
        description: `${
          categoryData.seoDescription
        } Browse ${plantsCount}+ ${categoryData.label.toLowerCase()} at Sanas Nursery.`,
        type: "website",
        url: `https://sanasnursery.com/plants/${categoryData.value}`,
        siteName: "Sanas Nursery",
        images: [
          {
            url: `https://sanasnursery.com/${categoryData.picture}`,
            width: 1200,
            height: 630,
            alt: categoryData.seoTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${categoryData.seoTitle} | Sanas Nursery`,
        description: `${
          categoryData.seoDescription
        } Browse ${plantsCount}+ ${categoryData.label.toLowerCase()} at Sanas Nursery.`,
        images: [`https://sanasnursery.com/${categoryData.picture}`],
      },
    };
  }

  return {
    title: "Plant Category Not Found | Sanas Nursery",
    description: "The plant category you're looking for could not be found.",
  };
}

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryKey = Object.keys(CATEGORIES).find(
    (key) => CATEGORIES[key as keyof typeof CATEGORIES].value === category
  );

  let categoryData = null;
  let plants: PlantDataType[] = [];
  let plantsCount = 0;

  if (categoryKey) {
    categoryData = CATEGORIES[categoryKey as keyof typeof CATEGORIES];

    try {
      const response = await getCategoryPlants(category, {});
      const plantsData: CategoryPlantsHttpResDataType = await response.json();
      plants = plantsData?.data?.plants || [];
      plantsCount = plantsData?.data?.total || 0;
    } catch (_error) {
      plants = [];
      plantsCount = 0;
    }
  }

  return (
    <>
      {categoryData ? (
        <Script
          id="breadcrumbs-category"
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
                name: "Categories",
                item: "https://sanasnursery.com/categories",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: categoryData.label,
                item: `https://sanasnursery.com/plants/${categoryData.value}`,
              },
            ],
          })}
        </Script>
      ) : null}

      {categoryData ? (
        <Script
          id="collection-page"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: categoryData.seoTitle,
            description: categoryData.seoDescription,
            url: `https://sanasnursery.com/plants/${categoryData.value}`,
            mainEntity: {
              "@type": "ItemList",
              name: `${categoryData.label} Plants`,
              description: `Collection of ${categoryData.label.toLowerCase()} plants available at Sanas Nursery`,
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
                    url: `https://sanasnursery.com/plants/${categoryData.value}/${plant.slug}/${plant._id}`,
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
      ) : null}

      {categoryData ? (
        <Script
          id="category-faq"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What types of ${categoryData.label.toLowerCase()} does Sanas Nursery offer?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Sanas Nursery offers a wide variety of ${categoryData.label.toLowerCase()} including ${plantsCount}+ different species. We provide healthy, well-cared-for plants suitable for gardens, farms, and landscaping projects.`,
                },
              },
              {
                "@type": "Question",
                name: `How do I care for ${categoryData.label.toLowerCase()}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Our ${categoryData.label.toLowerCase()} come with detailed care instructions. We provide expert guidance on watering, sunlight, soil requirements, and maintenance to ensure your plants thrive.`,
                },
              },
              {
                "@type": "Question",
                name: `Do you offer wholesale pricing for ${categoryData.label.toLowerCase()}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Yes, Sanas Nursery specializes in wholesale plant supply with competitive pricing for bulk orders. We cater to nurseries, landscapers, garden centers, and large-scale plant buyers.`,
                },
              },
              {
                "@type": "Question",
                name: `Can I visit your nursery to see the ${categoryData.label.toLowerCase()}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Yes, you can visit our nursery in Uruli Kanchan, Pune to see our ${categoryData.label.toLowerCase()} collection. We're open daily from 9 AM to 6 PM. Contact us at ${
                    SITE_DATA.phone
                  } for directions.`,
                },
              },
            ],
          })}
        </Script>
      ) : null}

      {categoryData ? (
        <Script
          id="category-business"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GardenStore",
            name: `Sanas Nursery - ${categoryData.label}`,
            description: `Specialized ${categoryData.label.toLowerCase()} nursery in Uruli Kanchan, Pune`,
            url: `https://sanasnursery.com/plants/${categoryData.value}`,
            image: categoryData.picture,
            telephone: "+91 8999481616",
            email: "info@sanasnursery.com",
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
              name: `${categoryData.label} Plants`,
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
      ) : null}

      {children}
    </>
  );
}
