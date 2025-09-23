import About from "@/components/about/about";
import Hero from "@/components/about/hero";
import Mission from "@/components/about/mission";
import WhyChoose from "@/components/about/whychoose";
import { SITE_DATA } from "@/lib/constants";
import Script from "next/script";
import React from "react";

const page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Leading Quality Plants and Trees Supplier | Sanas Nursery",
    url: "https://sanasnursery.com/about",
    headline: "About Sanas Nursery - Wholesale Plant Nursery in Uruli Kanchan",
    description:
      "Sanas Nursery is a trusted quality plants and trees supplier in Uruli Kanchan. Delivering healthy greenery with care and expertise.",
    mainEntity: {
      "@type": "Organization",
      name: "Sanas Nursery",
      url: "https://sanasnursery.com",
      logo: "/images/site/sanas-nursery.webp",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_DATA.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "mr"],
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
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div>
        <Hero />
        <About />
        <Mission />
        <WhyChoose />
      </div>
    </>
  );
};

export default page;
