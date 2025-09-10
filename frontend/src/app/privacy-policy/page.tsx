export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#ea580c] to-[#14532d] py-20 ">
        <div className="container-custom text-center pt-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-xl text-[#ffedd5] max-w-2xl mx-auto pt-5">
            Sanas Nursery respects your privacy and is committed to protecting
            your personal information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 ">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[#f8fafc] p-8 rounded-lg mb-8">
              <p className="text-[#475569] text-center">
                <strong>Last updated:</strong> 12 August 2025
              </p>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-[#475569] mb-4">
                  When you contact us through our website or WhatsApp, we may
                  collect:
                </p>
                <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your phone number / WhatsApp number</li>
                  <li>Any message or enquiry details you submit</li>
                </ul>
                <p className="text-[#475569] mt-4">
                  We do not collect payment details online, as no online
                  transactions take place through our website.
                </p>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
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
                    Sending you order or delivery updates via WhatsApp/SMS/email
                  </li>
                </ul>
              </div>

              {/* Communication */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
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
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                  4. Data Sharing
                </h2>
                <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                  <li>
                    We do not sell, rent, or trade your personal information to
                    third parties.
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
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                  5. Data Security
                </h2>
                <ul className="list-disc list-inside text-[#475569] space-y-2 ml-4">
                  <li>
                    We take reasonable technical and organizational measures to
                    protect your personal data.
                  </li>
                  <li>
                    However, we cannot guarantee complete security against
                    unauthorized access due to the nature of the internet.
                  </li>
                </ul>
              </div>

              {/* Third-Party Links */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
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
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
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
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                  8. Contact Us
                </h2>
                <p className="text-[#475569] mb-4">Sanas Nursery</p>
                <div className="bg-[#f8fafc] p-6 rounded-lg">
                  <p className="text-[#475569] mb-2">
                    <strong>Email:</strong> sanasnursery@gmail.com
                  </p>
                  <p className="text-[#475569] mb-2">
                    <strong>Phone/WhatsApp:</strong> 77986
                  </p>
                  <p className="text-[#475569] mb-2">
                    <strong>Location:</strong> Sanas Wholesale Nursery,
                    Bori Fata, near ITI collage, Uruli Kanchan, Maharashtra,
                    412201
                  </p>
                  <p className="text-[#475569] mt-4">
                    <strong>Contact Form:</strong>{" "}
                    <a
                      href="/contact"
                      className="text-[#ea580c] hover:text-[#c2410c] underline"
                    >
                      Visit our Contact page
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
