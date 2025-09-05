import { FOOTER_LINKS, SITE_DATA } from "@/lib/constants";
import Link from "next/link";
import Logo from "../logo";
import FooterPoweredBy from "./footer-powered-by";
import SocialMedia from "./SocialMedia";
import SubscribeEmail from "./subscribe-email";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<<<<<<< HEAD
    <div>
      <div
        key="outer-div"
        className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#1D2F33] "
      >
        <div
          key="inner-div"
          className="inner-div h-full lg:max-w-[1200px] md:w-[95%] w-[95%] flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between lg:items-start md:items-start items-center lg:space-y-0 md:space-y-0 space-y-10 "
        >
          <div
            key="1-div"
            className="h-fit w-fit lg:space-y-3 md:space-y-3 space-y-3 flex flex-col justify-between items-center"
          >
            <div>
              <Image
                src="/site/sanas-nursery-logo.webp"
                alt="Sana-Nursery-Logo"
                width={100}
                height={100}
                className="logo lg:h-25 lg:w-25 md:h-20 md:w-20 "
              />
            </div>
            <div
              key="3-icons"
              className=" flex flex-row justify-between items-center text-white lg:space-x-4 md:space-x-3 space-x-5"
            >
              <div className="h-[40px] w-[40px] bg-[#265a66] shadow-md shadow-black rounded-lg flex justify-center items-center">
                <Facebook className="z-10 hover:text-blue-600" />
              </div>
              <div className="h-[40px] w-[40px] bg-[#265a66] shadow-md shadow-black rounded-lg flex justify-center items-center">
                <Instagram className=" hover:text-pink-700" />
              </div>
              <div className="h-[40px] w-[40px] bg-[#265a66] shadow-md shadow-black rounded-lg flex justify-center items-center">
                <Youtube className=" h-7 w-7 hover:text-red-600" />
              </div>
            </div>
          </div>
          <div className="two-div h-[100%] lg:w-[350px] lg:space-x-0 md:space-x-3 space-x-20 flex flex-row justify-between items-start ">
            <div
              key="2-div"
              className="h-fit w-fit flex flex-col lg:items-start md:items-start items-center space-y-5 "
            >
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                Information
              </Link>
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                About
              </Link>
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                Product
              </Link>
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                Blog
              </Link>
            </div>
            <div
              key="3-div"
              className="h-fit w-fit flex flex-col lg:items-start md:items-start items-center space-y-5 "
            >
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                Company
              </Link>
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                Privacy Policy
              </Link>
              <Link
                href=""
                className="p footer-hover text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
          <div
            key="4-div"
            className="fourthdiv h-fit lg:w-fit md:w-[300px] flex flex-col lg:items-start md:items-start items-center space-y-5 "
          >
            <h1 className=" text-[#FFFFFF] lg:text-[32px] md:text-[26px] text-[26px] lg:font-semibold">
              Stay Rooted with Us
            </h1>
            <p className="p text-[#FFFFFF] lg:text-[20px] lg:font-semibold">
              Get plant tips, offers, and fresh arrivals in your inbox.
=======
    <footer className="bg-accent-900 text-white ">
      <div className="container-custom py-12">
        <div className="flex items-center space-x-3 mb-4">
          <Logo />
          <h3 className="text-xl font-bold text-primary-400">Sanas Nursery</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <p className="text-gray-400 text-sm">
              Stay tuned for updates and exciting announcements.
>>>>>>> 3255a5db4d49670603fc622dca158fa7f32a3784
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
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

          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.INFORMATION.map((link) => (
                <li>
                  <Link
                    key={link.label}
                    href={link.pageUrl}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.COMPANY.map((link) => (
                <li>
                  <Link
                    key={link.label}
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

        <div className="grid grid-cols-1 md:grid-cols-2  mt-8">
          <div className="">
            <p className="text-gray-400 text-sm mb-3">
              Follow us on social media:
            </p>
            <div className="text-white">
              <SocialMedia />
            </div>
          </div>

          <SubscribeEmail />
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
