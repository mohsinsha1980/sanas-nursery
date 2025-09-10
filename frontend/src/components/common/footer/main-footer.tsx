import { FOOTER_LINKS, SITE_DATA } from "@/lib/constants";
import Link from "next/link";
import Logo from "../logo";
import FooterPoweredBy from "./footer-powered-by";
import SocialMedia from "./SocialMedia";
import SubscribeEmail from "./subscribe-email";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-900 text-white ">
      <div className="container-custom py-12">
        <div className="flex items-center space-x-3 mb-4">
          <Logo />
          <h3 className="text-xl font-bold text-primary-400">Sanas Nursery</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 ">
          <div className="col-span-1 md:col-span-2 ">
            <p className="text-gray-400 text-sm">
              Stay tuned for updates and exciting announcements.
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-400 ">
              <p>
                Email:
                <Link
                  href={`mailto:${SITE_DATA.EMAIL}`}
                  className="hover:underline"
                >
                  {SITE_DATA.EMAIL}
                </Link>
              </p>
              <p>
                Phone/WhatsApp:
                <Link
                  href={`tel:${SITE_DATA.phone.replace(/\s/g, "")}`}
                  className="hover:underline"
                >
                  {SITE_DATA.phone}
                </Link>
              </p>
              <p>Location: {SITE_DATA.LOCATION}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-baseline-last">
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.INFORMATION.map((link) => (
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

          <div className="flex flex-col justify-center items-baseline-last">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 ">
          <div className=" ">
            <p className="text-gray-400 text-sm mb-3">
              Follow us on social media:
            </p>
            <div className="text-white">
              <SocialMedia />
            </div>
          </div>

          <div className="flex justify-end ">
            <SubscribeEmail />
          </div>
        </div>

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
