import { SITE_DATA } from "@/lib/constants";

export default function TermsConditionsPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#ea580c] to-[#16a34a] py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ffedd5] max-w-2xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our
            website.
          </p>
        </div>
      </section>

      {/* Terms & Conditions Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="lg:max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none">
            <div className="bg-[#f8fafc] p-4 sm:p-6 md:p-8 rounded-lg mb-6 sm:mb-8">
              <p className="text-sm sm:text-base md:text-lg text-[#475569] text-center">
                <strong>Last Updated : </strong> 12 August 2025
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Section 1 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  1. Nature of Our Website
                </h2>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>Our website is for product showcase only.</li>
                  <li>
                    We do not display prices, sell products directly online, or
                    provide an online payment facility.
                  </li>
                  <li>
                    All purchases are handled offline after you contact us via
                    our enquiry form, WhatsApp, or direct communication.
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  2. Product Information
                </h2>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>
                    While we strive to display accurate product details,
                    descriptions, and images, minor variations may occur due to
                    natural differences in plants.
                  </li>
                  <li>
                    The availability of products may change without notice.
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  3. Enquiry & Communication
                </h2>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>
                    Submitting an enquiry through our website or WhatsApp does
                    not constitute a confirmed order.
                  </li>
                  <li>
                    All discussions regarding pricing, availability, and
                    delivery will be handled directly between you and our team
                    after your enquiry.
                  </li>
                  <li>
                    You agree to provide accurate and complete contact
                    information so we can respond to your enquiry.
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  4. Orders & Payments
                </h2>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>
                    Orders are confirmed only after mutual agreement between the
                    buyer and Wholesale Nursery Plants (SANAS) through offline
                    communication.
                  </li>
                  <li>
                    Payments are made offline via methods agreed upon with our
                    team.
                  </li>
                  <li>
                    We are not responsible for any payment made to third parties
                    claiming to represent us. Always confirm payment details
                    directly with our official contact.
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  5. Delivery & Pickup
                </h2>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>
                    Delivery or pickup arrangements will be discussed and agreed
                    upon individually for each order.
                  </li>
                  <li>
                    Any delivery timelines provided are estimates and may vary
                    due to weather, logistics, stock conditions.
                  </li>
                </ul>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  6. WhatsApp & SMS Communication
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] mb-3 sm:mb-4 leading-relaxed">
                  By sending us an enquiry, you agree to receive WhatsApp
                  messages or SMS related to:
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>Product details</li>
                  <li>Order confirmation</li>
                  <li>Delivery arrangements</li>
                </ul>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 leading-relaxed">
                  We do not send promotional messages without your consent.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  7. Intellectual Property
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed">
                  All images, content, and materials on our website and
                  Instagram are the property of Wholesale Nursery Plants
                  (SANAS). You may not copy, download, or reproduce them without
                  our written permission.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] mb-3 sm:mb-4 leading-relaxed">
                  We are not liable for:
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#475569] space-y-1 sm:space-y-2 ml-4 leading-relaxed">
                  <li>Delays caused by delivery partners.</li>
                  <li>
                    Variations in plant size, shape, or colour due to natural
                    growth.
                  </li>
                </ul>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 leading-relaxed">
                  Our responsibility is limited to supplying the agreed product
                  in healthy condition at the time of delivery or pickup.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  9. Third-Party Links
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed">
                  Our Instagram and other platforms may contain links to
                  third-party sites. We are not responsible for the content or
                  policies of those sites.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed">
                  We may update these Terms & Conditions at any time without
                  prior notice. Please review this page periodically.
                </p>
              </div>

              {/* Section 11 */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[#0f172a] mb-3 sm:mb-4">
                  11. Contact Us
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[#475569] mb-3 sm:mb-4 leading-relaxed">
                  Sanas Nursery
                </p>
                <div className="bg-[#f8fafc] p-4 sm:p-6 rounded-lg">
                  <p className="text-sm sm:text-base md:text-lg text-[#475569] mb-2 leading-relaxed">
                    <strong>Email : </strong> {SITE_DATA.EMAIL}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-[#475569] mb-2 leading-relaxed">
                    <strong>Phone/WhatsApp : </strong> {SITE_DATA.phone}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-[#475569] mb-2 leading-relaxed">
                    <strong>Location : </strong> {SITE_DATA.LOCATION} 
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 leading-relaxed">
                    <strong>Contact Form : </strong>
                    <a
                      href="/contact-us"
                      className="text-[#ea580c] hover:text-[#c2410c] underline"
                    >
                      Visit our Contact page
                    </a>
                  </p>
                </div>
              </div>

              {/* Acceptance of Terms */}
              <div className="bg-[#fff7ed] p-4 sm:p-6 rounded-lg border-l-4 border-[#f97316]">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#7c2d12] mb-2">
                  Acceptance of Terms
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[#9a3412] leading-relaxed">
                  By using our website, you acknowledge that you have read these
                  terms and conditions and agree to be bound by them. If you do
                  not agree to these terms, please do not use our website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
