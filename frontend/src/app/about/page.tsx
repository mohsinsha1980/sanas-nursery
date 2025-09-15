import About from "@/components/about/about";
import Hero from "@/components/about/hero";
import Mission from "@/components/about/mission";
import WhyChoose from "@/components/about/whychoose";
import React from "react";

const page = () => {
  const schemaData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sanas Nursery – Wholesale Plant Nursery Uruli Kanchan",
  url: "https://sanasnursery.com/about",
  headline: "About Sanas Nursery - Wholesale Plant Nursery in Uruli Kanchan",
  description:
    "Visit Sanas Nursery, a wholesale plant nursery in Uruli Kanchan, Maharashtra. Wide range of fruit plants, flower trees & healthy greenery.",
  mainEntity: {
    "@type": "Organization",
    name: "Sanas Nursery",
    url: "https://sanasnursery.com",
    logo: "https://sanasnursery.com/logo.png", // 🔹 replace with actual logo URL
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXXXXXXXXX", 
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "mr"]
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uruli Kanchan",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "412202", 
      addressCountry: "IN"
    }
  }
};

  return (
    <div>
      <Hero />
      <About />
      <Mission />
      <WhyChoose />
    </div>
  );
};

export default page;
