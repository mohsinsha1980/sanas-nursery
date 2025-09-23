import { HERO } from "@/assets";
import { SITE_DATA } from "@/lib/constants";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Sanas Nursery | Wholesale Plant Nursery Pune",
  description:
    "Sanas Nursery - Trusted wholesale plant nursery in Uruli Kanchan, Pune Maharashtra. Expert care in fruit, flowering, shadow, show and masala plants",
  keywords: [
    "about Sanas Nursery",
    "wholesale plant nursery Pune",
    "Uruli Kanchan nursery",
    "fruit trees wholesale",
    "flowering plants nursery",
    "shadow trees supplier",
    "masala plants nursery",
    "plant nursery Maharashtra",
    "wholesale plants supplier",
    "nursery business Pune",
    "plant cultivation expertise",
    "garden center Uruli Kanchan",
    "plant nursery history",
    "nursery team expertise",
  ],
  authors: [{ name: "Sanas Nursery" }],
  creator: "Sanas Nursery",
  publisher: "Sanas Nursery",
  category: "Agriculture & Gardening",
  classification: "Wholesale Plant Nursery",
  alternates: {
    canonical: "https://sanasnursery.com/about",
    languages: {
      "en-IN": "https://sanasnursery.com/about",
    },
  },
  openGraph: {
    title: "About Sanas Nursery | Wholesale Plant Nursery Pune",
    description:
      "Learn about Sanas Nursery in Uruli Kanchan, Pune — trusted wholesale supplier for fruit trees, flowering plants, shadow trees & masala plants.",
    url: "https://sanasnursery.com/about",
    images: [
      {
        url: HERO.ABOUT,
        width: 1200,
        height: 630,
        alt: "About Sanas Nursery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sanas Nursery | Wholesale Plant Nursery Pune",
    description:
      "Know our story — wholesale nursery in Uruli Kanchan, Pune. Fruit trees, flowering plants, shadow trees & masala plants.",
    images: ["https://sanasnursery.com/images/site/sanas-nursery.webp"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sanas Nursery – Wholesale Plant Nursery Uruli Kanchan",
    url: "https://sanasnursery.com/about",
    headline: "About Sanas Nursery - Wholesale Plant Nursery in Uruli Kanchan",
    description:
      "Sanas Nursery - Trusted wholesale plant nursery in Uruli Kanchan, Pune Maharashtra. Expert care in fruit, flowering, shadow, show and masala plants",
    mainEntity: {
      "@type": "Organization",
      name: "Sanas Nursery",
      url: "https://sanasnursery.com",
      logo: "/images/site/sanas-nursery.webp",
      sameAs: [
        SITE_DATA.GOOGLE_MAP_FOR_SEO,
        SITE_DATA.SOCIAL.facebook,
        SITE_DATA.SOCIAL.insta,
        SITE_DATA.SOCIAL.youtube,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_DATA.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en"],
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
  };

  return (
    <section>
      <Script
        id="about-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Script
        id="about-breadcrumbs"
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
              name: "About",
              item: "https://sanasnursery.com/about",
            },
          ],
        })}
      </Script>

      <Script
        id="about-faq"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Sanas Nursery?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sanas Nursery is a trusted wholesale plant nursery located in Uruli Kanchan, Pune, Maharashtra. We specialize in fruit trees, flowering plants, shadow trees, and masala plants with over 15 years of expertise in plant cultivation.",
              },
            },
            {
              "@type": "Question",
              name: "Where is Sanas Nursery located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sanas Nursery is located in Uruli Kanchan, Pune, Maharashtra, India. We serve customers across Maharashtra and provide wholesale plant supplies to nurseries, landscapers, and garden centers.",
              },
            },
            {
              "@type": "Question",
              name: "What types of plants does Sanas Nursery supply?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We supply fruit trees, flowering plants, shadow trees, show trees, and masala plants. Our extensive collection includes both indoor and outdoor plants suitable for various climates and growing conditions.",
              },
            },
            {
              "@type": "Question",
              name: "Does Sanas Nursery offer wholesale pricing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Sanas Nursery specializes in wholesale plant supply with competitive pricing for bulk orders. We cater to nurseries, landscapers, garden centers, and large-scale plant buyers.",
              },
            },
          ],
        })}
      </Script>

      {children}
    </section>
  );
}
