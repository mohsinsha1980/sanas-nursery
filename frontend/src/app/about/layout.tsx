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

      {children}
    </section>
  );
}
