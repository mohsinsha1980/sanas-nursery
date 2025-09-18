import ContactPage from "@/components/contact/contact-form";
import Hero from "@/components/contact/hero";
import Script from "next/script";
import React from "react";

const page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us - We are Located in Uruli Kanchan, Pune",
    url: "https://sanasnursery.com/contact-us",
    headline: "Contact Sanas Nursery",
    description:
      "Whether you have questions or need support, contact us today! Located in Uruli Kanchan, Pune, Maharashtra, we’re ready to assist with all your needs.",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Sanas Nursery",
      url: "https://sanasnursery.com",
      logo: {
        "@type": "ImageObject",
        url: "https://sanasnursery.com/images/site/sanas-nursery.webp",
      },
      contactPoint: {
        "@type": "ContactPoint",
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
        id="contact-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div>
        <Hero />
        <ContactPage />
      </div>
    </>
  );
};

export default page;
