import { getPlantDetailsByID } from "@/lib/api-routes/api-public";
import { CATEGORIES, SITE_DATA } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";
import { SITE } from "@/assets";
import type { Metadata } from "next";
import Script from "next/script";
import { PlantDataType } from "@/lib/types/common-types";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ plant_id: string; category: string; plant_slug: string }>;
}

async function fetchProductDetails(plantID: string) {
  const controller = new AbortController();
  const response = await getPlantDetailsByID(plantID, controller);
  const plantData = await response.json();
  return plantData;
}

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { plant_id, category, plant_slug } = await params;

  try {
    const response = await fetchProductDetails(plant_id);

    if (!response?.data?.plant) {
      return {
        title: "Plant Not Found | Sanas Nursery",
        description: "The plant you're looking for could not be found.",
      };
    }

    const plant = response.data.plant;
    const categoryData = Object.values(CATEGORIES).find(
      (cat) => cat.value === category
    );

    const title = `${plant.title} | ${
      categoryData?.label || "Plant"
    } | Sanas Nursery`;
    const description =
      plant.metaDescription ||
      `${plant.title} - Premium ${
        categoryData?.label.toLowerCase() || "plant"
      } at Sanas Nursery. ${
        plant.summary || "High-quality plant with expert care."
      } Available for wholesale.`;

    return {
      title,
      description,
      keywords: [
        plant.title.toLowerCase(),
        `${plant.title} plant`,
        `${plant.title} wholesale`,
        `buy ${plant.title}`,
        `${categoryData?.label.toLowerCase()} plants`,
        `${categoryData?.label.toLowerCase()} wholesale`,
        "plant nursery Pune",
        "wholesale plants Maharashtra",
        "Sanas Nursery",
        "plant supplier",
        "garden plants",
        "plant cultivation",
        plant.sku || "",
        ...(plant.tags || []),
      ],
      authors: [{ name: "Sanas Nursery" }],
      creator: "Sanas Nursery",
      publisher: "Sanas Nursery",
      category: "Plants & Gardening",
      alternates: {
        canonical: `https://sanasnursery.com/plants/${category}/${plant_slug}/${plant_id}`,
        languages: {
          "en-IN": `https://sanasnursery.com/plants/${category}/${plant_slug}/${plant_id}`,
        },
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://sanasnursery.com/plants/${category}/${plant_slug}/${plant_id}`,
        siteName: "Sanas Nursery",
        images: [
          {
            url: getPicURL(plant.pictures?.[0]),
            width: 1200,
            height: 630,
            alt: plant.title,
          },
          ...(plant.pictures?.slice(1, 4).map((pic: string) => ({
            url: getPicURL(pic),
            width: 800,
            height: 600,
            alt: plant.title,
          })) || []),
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [getPicURL(plant.pictures?.[0])],
      },
    };
  } catch (_error) {
    return {
      title: "Plant Not Found | Sanas Nursery",
      description: "The plant you're looking for could not be found.",
    };
  }
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { plant_id, category, plant_slug } = await params;

  let plant = null;
  let categoryData = null;

  try {
    const response: {
      data: {
        plant: PlantDataType;
        similarPlants: PlantDataType[];
      };
    } = await fetchProductDetails(plant_id);
    if (response?.data?.plant) {
      plant = response.data.plant;
    }
    categoryData = Object.values(CATEGORIES).find(
      (cat) => cat.value === category
    );
  } catch (_error) {
    plant = null;
    categoryData = null;
  }

  if (!plant) {
    return <>{children}</>;
  }

  const pictures = plant.pictures?.map((item: string) => getPicURL(item)) || [];

  return (
    <>
      <Script
        id="breadcrumbs-product"
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
              name: categoryData?.label || "Plants",
              item: `https://sanasnursery.com/plants/${category}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: plant.title,
              item: `https://sanasnursery.com/plants/${category}/${plant_slug}/${plant_id}`,
            },
          ],
        })}
      </Script>

      <Script
        id="product-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: plant.title,
          description: plant.metaDescription || plant.summary,
          image: pictures,
          brand: {
            "@type": "Brand",
            name: "Sanas Nursery",
            logo: SITE.SEO_LOGO,
          },
          manufacturer: {
            "@type": "Organization",
            name: "Sanas Nursery",
            url: "https://sanasnursery.com",
          },
          category: categoryData?.label || "Plant",
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            seller: {
              "@type": "Organization",
              name: "Sanas Nursery",
              url: "https://sanasnursery.com",
            },
            shippingDetails: {
              "@type": "OfferShippingDetails",
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                businessDays: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                },
              },
            },
          },
          additionalProperty:
            plant.specifications?.map(
              (spec: { label: string; value: string }) => ({
                "@type": "PropertyValue",
                name: spec.label,
                value: spec.value,
              })
            ) || [],
        })}
      </Script>

      <Script
        id="product-faq"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `What is ${plant.title}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  plant.metaDescription ||
                  plant.summary ||
                  `${
                    plant.title
                  } is a premium quality plant available at Sanas Nursery. ${
                    plant.details
                      ? plant.details
                          .replace(/<[^>]*>/g, "")
                          .substring(0, 200) + "..."
                      : "Perfect for gardens, landscaping, and plant enthusiasts."
                  }`,
              },
            },
            {
              "@type": "Question",
              name: `Is ${plant.title} available for wholesale?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Yes, ${plant.title} is available for wholesale at competitive prices. We cater to nurseries, landscapers, garden centers, and large-scale plant buyers. Contact us for bulk pricing and delivery options.`,
              },
            },
            {
              "@type": "Question",
              name: `Can I visit your nursery to see ${plant.title}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Yes, you can visit our nursery in Uruli Kanchan, Pune to see our ${plant.title} collection. We're open daily from 9 AM to 6 PM. Contact us ${SITE_DATA.phone} for directions and to check availability.`,
              },
            },
          ],
        })}
      </Script>

      {/* LocalBusiness Schema for Product */}
      <Script
        id="product-business"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GardenStore",
          name: "Sanas Nursery",
          description: `Premium ${
            plant.title
          } and ${categoryData?.label.toLowerCase()} plants supplier in Uruli Kanchan, Pune`,
          url: "https://sanasnursery.com",
          image: SITE.SEO_LOGO,
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
            name: `${categoryData?.label} Plants`,
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: plant.title,
                  description: plant.metaDescription || plant.summary,
                  image: getPicURL(plant.pictures?.[0]),
                },
                priceCurrency: "INR",
              },
            ],
          },
        })}
      </Script>

      {children}
    </>
  );
}
