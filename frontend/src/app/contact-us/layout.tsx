import { SITE_DATA } from "@/lib/constants";
import { SITE } from "@/assets";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Contact Sanas Nursery | Wholesale Plant Nursery in Uruli Kanchan Pune",
  description: `Contact Sanas Nursery for wholesale plant orders and expert guidance. Located in Uruli Kanchan, Pune. Call us on ${SITE_DATA.phone} or visit our nursery for quality plants.`,
  keywords: [
    "contact plant nursery",
    "wholesale plant orders",
    "plant consultation Pune",
    "nursery contact Uruli Kanchan",
    "plant supplier contact",
    "bulk plant orders contact",
    "plant nursery consultation",
    "garden center contact",
    "plant expert advice",
    "nursery visit Pune",
    "plant delivery contact",
    "wholesale plants inquiry",
    "plant care consultation",
    "landscaping plants contact",
    "Sanas Nursery contact",
  ],
  authors: [{ name: "Sanas Nursery" }],
  creator: "Sanas Nursery",
  publisher: "Sanas Nursery",
  category: "Plants & Gardening",
  alternates: {
    canonical: "https://sanasnursery.com/contact-us",
    languages: {
      "en-IN": "https://sanasnursery.com/contact-us",
    },
  },
  openGraph: {
    title:
      "Contact Sanas Nursery | Wholesale Plant Nursery in Uruli Kanchan Pune",
    description:
      "Get in touch with Sanas Nursery for wholesale plant orders, expert consultation, and quality plants. Located in Uruli Kanchan, Pune. Call or visit us today!",
    type: "website",
    url: "https://sanasnursery.com/contact-us",
    siteName: "Sanas Nursery",
    images: [
      {
        url: SITE.SEO_LOGO,
        width: 1200,
        height: 630,
        alt: "Contact Sanas Nursery - Wholesale Plant Nursery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sanas Nursery | Wholesale Plant Nursery Pune",
    description:
      "Contact Sanas Nursery for wholesale plants, expert consultation & quality service. Located in Uruli Kanchan, Pune. Call us today!",
    images: [SITE.SEO_LOGO],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ContactPage Schema */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Sanas Nursery - Wholesale Plant Nursery",
          url: "https://sanasnursery.com/contact-us",
          headline: "Contact Sanas Nursery for Wholesale Plants",
          description:
            "Get in touch with Sanas Nursery for wholesale plant orders, expert consultation, and quality plants. Located in Uruli Kanchan, Pune, Maharashtra.",
          mainEntity: {
            "@type": "Organization",
            name: "Sanas Nursery",
            url: "https://sanasnursery.com",
            logo: {
              "@type": "ImageObject",
              url: SITE.SEO_LOGO,
              width: 200,
              height: 200,
            },
            contactPoint: [
              {
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
                  opens: "09:00",
                  closes: "18:00",
                },
              },
              {
                "@type": "ContactPoint",
                telephone: SITE_DATA.phone,
                contactType: "sales",
                areaServed: "IN",
                availableLanguage: ["en"],
              },
            ],
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
            sameAs: [
              SITE_DATA.GOOGLE_MAP_FOR_SEO,
              SITE_DATA.SOCIAL.facebook,
              SITE_DATA.SOCIAL.insta,
              SITE_DATA.SOCIAL.youtube,
            ],
          },
        })}
      </Script>

      {/* LocalBusiness Schema */}
      <Script
        id="local-business-contact"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GardenStore",
          name: "Sanas Nursery",
          description:
            "Wholesale plant nursery specializing in fruit trees, flowering plants, shadow trees, and masala plants. Located in Uruli Kanchan, Pune.",
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
            name: "Plant Categories",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Fruit Trees",
                  description: "Premium fruit trees for gardens and farms",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Flowering Plants",
                  description: "Beautiful flowering plants and trees",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Shadow Trees",
                  description: "Shadow-giving trees for landscaping",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Show Trees",
                  description: "Show trees for landscaping",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: "Masala Plants",
                  description: "Herbs and spice plants for culinary use",
                },
              },
            ],
          },
        })}
      </Script>

      {/* FAQ Schema for Contact */}
      <Script
        id="contact-faq"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How can I contact Sanas Nursery?",
              acceptedAnswer: {
                "@type": "Answer",
                text: `You can contact Sanas Nursery by calling ${SITE_DATA.phone}, emailing ${SITE_DATA.EMAIL}, or visiting our nursery in Uruli Kanchan, Pune. We're open daily from 9 AM to 6 PM.`,
              },
            },
            {
              "@type": "Question",
              name: "Where is Sanas Nursery located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sanas Nursery is located in Uruli Kanchan, Pune, Maharashtra, India. We're easily accessible and welcome visitors to see our plant collection.",
              },
            },
            {
              "@type": "Question",
              name: "Can I visit your nursery to see the plants?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely! We encourage visitors to come and see our plant collection. You can walk through our nursery, get expert advice, and choose plants in person.",
              },
            },
          ],
        })}
      </Script>

      {/* Breadcrumb Schema */}
      <Script
        id="contact-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
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
              name: "Contact Us",
              item: "https://sanasnursery.com/contact-us",
            },
          ],
        })}
      </Script>

      {children}
    </>
  );
}
