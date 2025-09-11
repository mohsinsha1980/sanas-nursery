import { FOOTER_LINKS, SITE_DATA } from "@/lib/constants";
import Link from "next/link";
import Logo from "../logo";
import FooterPoweredBy from "./footer-powered-by";
import SocialMedia from "./SocialMedia";
import SubscribeEmail from "./subscribe-email";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-900 text-white">
      <div className="container-custom py-12">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center md:justify-start space-x-3 mb-8">
          <Logo />
          {/* <h3 className="text-xl font-bold text-primary-400">Sanas Nursery</h3> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {/* Company Info - Centered on mobile */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left    ">
            <p className="text-gray-400 text-sm mb-4">
              Stay tuned for updates and exciting announcements.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                Email:{" "}
                <Link
                  href={`mailto:${SITE_DATA.EMAIL}`}
                  className="hover:underline hover:text-primary-400 transition-colors duration-200"
                >
                  {SITE_DATA.EMAIL}
                </Link>
              </p>
              <p>
                Phone/WhatsApp:{" "}
                <Link
                  href={`tel:${SITE_DATA.phone.replace(/\s/g, "")}`}
                  className="hover:underline hover:text-primary-400 transition-colors duration-200"
                >
                  {SITE_DATA.phone}
                </Link>
              </p>
              <p>Location: {SITE_DATA.LOCATION}</p>
            </div>
          </div>

          {/* Information Links - Centered on mobile */}
          <div className="flex flex-col justify-between items-end ">
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-end">
              {FOOTER_LINKS.INFORMATION.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.pageUrl}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links - Centered on mobile */}
          <div className="flex flex-col justify-between items-end ">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-end">
              {FOOTER_LINKS.COMPANY.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.pageUrl}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm mb-3">
              Follow us on social media:
            </p>
            <div className="flex justify-center md:justify-start">
              <SocialMedia />
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <SubscribeEmail />
          </div>
        </div>

        {/* Copyright and Powered By */}
        <div className="border-t border-accent-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Sanas Nursery. All rights reserved.
            </p>
            <div className="flex justify-center">
              <FooterPoweredBy />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
