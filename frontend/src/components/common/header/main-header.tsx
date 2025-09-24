"use client";
import { CATEGORY_ARR } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../logo";
import HeaderActions from "./header-actions";
import HeaderNav from "./header-nav";

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileDropdownOpen &&
        !(event.target as Element).closest("li.relative")
      ) {
        setMobileDropdownOpen(false);
      }
    };

    if (mobileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileDropdownOpen]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (mobileOpen) {
      const prevHtmlOverflow = html.style.overflow;
      const prevBodyOverflow = body.style.overflow;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      return () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
      };
    }
  }, [mobileOpen]);
  return (
    <header className="md:relative flex justify-center items-center w-full">
      <div
        className={`bg-nav fixed top-0 z-50 transition-transform flex justify-center w-full overflow-visible bg-white/30 backdrop-blur-md ${
          isScrolled
            ? "bg-white/30 backdrop-blur-md md:absolute md:translate-y-0 md:top-0"
            : "md:absolute"
        }`}
      >
        <div
          className={`main_header w-[95%] md:max-w-[var(--container-7xl)] md:px-[var(--spacing-lg)] mx-auto overflow-visible`}
        >
          <div>
            <Logo size={60} />
          </div>

          <div className="hidden flex-1 md:flex justify-center">
            <HeaderNav />
          </div>

          <div className="pt-3">
            <HeaderActions />
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <X className="text-black" size={28} />
              ) : (
                <Menu className="text-black" size={28} />
              )}
            </button>
          </div>
      
          {/* mobile sidebar */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 left-0 w-[80%] bg-gray-50 lg:hidden z-50 min-h-screen"
              >
                <nav className="w-full ">
                  <ul className="flex flex-col w-full">
                    {/* Home */}
                    <li>
                      <Link
                        href="/"
                        className={`flex items-center px-6 py-4 text-base font-semibold transition-colors duration-200 ${
                          pathname === "/"
                            ? "bg-gray-300 w-full"
                            : "text-gray-900 "
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Home
                      </Link>
                    </li>

                    <li className="relative">
                      <button
                        type="button"
                        className={`flex items-center justify-between w-full px-6 py-4 transition-colors duration-200 ${
                          pathname.startsWith("/plants")
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          setMobileDropdownOpen(!mobileDropdownOpen)
                        }
                        aria-expanded={mobileDropdownOpen}
                        aria-controls="mobile-plants-dropdown"
                      >
                        <span
                          className={`text-[20px] font-semibold ${
                            pathname.startsWith("/plants")
                              ? "bg-gray-300"
                              : "text-black"
                          }`}
                        >
                          Plants
                        </span>

                        <svg
                          className={`w-4 h-4 transition-all duration-200 ${
                            mobileDropdownOpen
                              ? "rotate-180 text-black"
                              : "text-black"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Plant Categories Dropdown */}
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden bg-white"
                            id="mobile-plants-dropdown"
                          >
                            {CATEGORY_ARR.map((cat) => (
                              <div key={cat.value} className="w-full">
                                <Link
                                  href={`/plants/${cat.value}`}
                                  className={`block px-12 py-3 text-sm transition-colors duration-200 border-l-2 ${
                                    pathname === `/plants/${cat.value}`
                                      ? "!text-orange-500 "
                                      : "text-gray-700 hover:bg-gray-50 w-full"
                                  }`}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileDropdownOpen(false);
                                  }}
                                >
                                  {cat.label}
                                </Link>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>

                    {/* About */}
                    <li>
                      <Link
                        href="/about"
                        className={`flex items-center px-6 py-4 text-base font-semibold transition-colors duration-200 ${
                          pathname === "/about"
                            ? "bg-gray-300 w-full"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        About
                      </Link>
                    </li>

                    {/* Contact */}
                    <li>
                      <Link
                        href="/contact-us"
                        className={`flex items-center px-6 py-4 text-base font-semibold transition-colors duration-200 ${
                          pathname === "/contact-us"
                            ? "bg-gray-300 w-full"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Contact
                      </Link>
                    </li>

                    {/* Blog */}
                    <li>
                      <Link
                        href="/blogs"
                        className={`flex items-center px-6 py-4 text-base font-semibold transition-colors duration-200 ${
                          pathname === "/blogs"
                            ? "bg-gray-300 w-full"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
