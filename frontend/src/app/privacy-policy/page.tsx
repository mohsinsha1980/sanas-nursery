import { SITE_DATA } from "@/lib/constants";
import Script from "next/script";
import Link from "next/link";
import { SITE } from "@/assets";

export default function PrivacyPolicyPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - Sanas Nursery",
    url: "https://sanasnursery.com/privacy-policy",
    headline: "Privacy Policy",
    description:
      "Read the Privacy Policy of Sanas Nursery, Uruli Kanchan. Learn how we collect, use, and protect your personal information when you contact us or place an enquiry.",
    mainEntity: {
      "@type": "Organization",
      name: "Sanas Nursery",
      url: "https://sanasnursery.com",
      logo: {
        "@type": "ImageObject",
        url: SITE.SEO_LOGO,
      },
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
        id="privacy-policy-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="bg-white">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-[#ea580c] to-[#14532d] py-12 sm:py-16 md:py-20">
          <div className="lg:max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20 ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ffedd5] max-w-2xl mx-auto leading-relaxed">
              Sanas Nursery respects your privacy and is committed to protecting
              your personal information.
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="lg:max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none">
              <div className="bg-[#f8fafc] p-4 sm:p-6 md:p-8 rounded-lg mb-6 sm:mb-8">
                <p className="text-base sm:text-base md:text-lg text-[#475569] text-center">
                  <strong>Last updated:</strong> 12 August 2025
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    1. Information We Collect
                  </h2>
                  <p className="text-base sm:text-base md:text-lg text-[#475569] mb-3 sm:mb-4 leading-relaxed">
                    When you contact us through our website or WhatsApp, we may
                    collect:
                  </p>
                  <ul className="list-disc list-inside text-base sm:text-base md:text-lg text-[#475569] space-y-2 sm:space-y-2 ml-4 leading-relaxed">
                    <li>Your name</li>
                    <li>Your email address</li>
                    <li>Your phone number / WhatsApp number</li>
                    <li>Any message or enquiry details you submit</li>
                  </ul>
                  <p className="text-base sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 leading-relaxed">
                    We do not collect payment details online, as no online
                    transactions take place through our website.
                  </p>
                </div>

                {/* How We Use Your Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-[#475569] mb-4">
                    We use the information you provide only for:
                  </p>
                  <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                    <li>Responding to your enquiries</li>
                    <li>Sharing product availability and details</li>
                    <li>Arranging delivery or pickup</li>
                    <li>
                      Sending you order or delivery updates via
                      WhatsApp/SMS/email
                    </li>
                  </ul>
                </div>

                {/* Communication */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    3. Communication
                  </h2>
                  <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                    <li>
                      We may contact you by WhatsApp, SMS, email, or phone for
                      updates related to your enquiry or order.
                    </li>
                    <li>
                      We do not send promotional messages without your consent.
                    </li>
                    <li>
                      You can unsubscribe from promotional communications at any
                      time by informing us.
                    </li>
                  </ul>
                </div>

                {/* Data Sharing */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    4. Data Sharing
                  </h2>
                  <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                    <li>
                      We do not sell, rent, or trade your personal information
                      to third parties.
                    </li>
                    <li>
                      We may share your contact details only with delivery
                      partners for fulfilling your order.
                    </li>
                    <li>
                      We are not responsible for the privacy practices of
                      third-party websites linked from our site or Instagram.
                    </li>
                  </ul>
                </div>

                {/* Data Security */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    5. Data Security
                  </h2>
                  <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                    <li>
                      We take reasonable technical and organizational measures
                      to protect your personal data.
                    </li>
                    <li>
                      However, we cannot guarantee complete security against
                      unauthorized access due to the nature of the internet.
                    </li>
                  </ul>
                </div>

                {/* Third-Party Links */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    6. Third-Party Links
                  </h2>
                  <p className="text-[#475569]">
                    Our website and Instagram may contain links to third-party
                    websites. This Privacy Policy does not apply to those
                    websites, and we are not responsible for their practices.
                  </p>
                </div>

                {/* Changes to Policy */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    7. Changes to This Policy
                  </h2>
                  <p className="text-[#475569]">
                    We may update this Privacy Policy from time to time without
                    prior notice. Please review this page periodically for any
                    updates.
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                    8. Contact Us
                  </h2>
                  <p className="text-[#475569] mb-4">Sanas Nursery</p>
                  <div className="bg-[#f8fafc] p-4 sm:p-6 rounded-lg">
                    <p className="text-base sm:text-base md:text-lg text-[#475569] mb-2 leading-relaxed">
                      <strong>Email : </strong>
                      <Link
                        href={`mailto:${SITE_DATA.EMAIL}`}
                        className="hover:text-[#ea580c] hover:underline"
                      >
                        {SITE_DATA.EMAIL}
                      </Link>
                    </p>
                    <p className="text-base sm:text-base md:text-lg text-[#475569] mb-2 leading-relaxed">
                      <strong>Phone/WhatsApp : </strong>
                      <Link
                        href={`tel:${SITE_DATA.phone}`}
                        className="hover:text-[#ea580c] hover:underline"
                      >
                        {SITE_DATA.phone}
                      </Link>
                    </p>
                    <p className="text-base sm:text-base md:text-lg text-[#475569] mb-2 leading-relaxed">
                      <strong>Location : </strong> {SITE_DATA.LOCATION}
                    </p>
                    <p className="text-base sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 leading-relaxed">
                      <strong>Contact Form : </strong>
                      <Link
                        href="/contact-us"
                        className="hover:text-[#ea580c] hover:underline"
                      >
                        Visit our Contact page
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
