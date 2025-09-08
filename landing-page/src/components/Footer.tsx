import Link from "next/link";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import FooterPoweredBy from "./footer-powered-by";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-900 text-white">
      <div className="container-custom py-12">
        <div className="flex items-center space-x-3 mb-4">
          <Logo />
          <h3 className="text-xl font-bold text-primary-400">Sanas Nursery</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-gray-400 text-sm">
              Stay tuned for updates and exciting announcements.Q
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <p>Email: sanasnursery@gmail.com</p>
              <p>Phone/WhatsApp: +91 8999481616 / +91 9090401616</p>
              <p>
                Location: Sanas Wholesale Nursery, Bori Fata, near ITI collage,
                Uruli Kanchan, Maharashtra, 412201
              </p>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-3">
                Follow us on social media:
              </p>
              <div className="text-white">
                <SocialMedia />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-evenly gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Sanas Nursery. All rights reserved.
          </p>
          <FooterPoweredBy />
        </div>
      </div>
    </footer>
  );
}
