"use client";
import HeaderActions from "./header-actions";
import Logo from "../logo";
import HeaderNav from "./header-nav";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/constants";

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

  // Close mobile dropdown when clicking outside
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
  return (
    <header className="md:relative flex justify-center items-center w-full">
      <div
        className={`bg-nav fixed top-0 z-50 transition-transform flex justify-center w-full overflow-visible ${
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

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="absolute top-[80px] right-0 h-fit w-full bg-white shadow-md p-4 flex flex-col justify-between items-center gap-4 lg:hidden z-50  "
              >
                <nav className="">
                  <ul className="flex flex-col gap-4 w-full items-center">
                    <li>
                      <Link
                        href="/"
                        className={`dropdown-link ${
                          pathname === "/" ? "active" : ""
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="relative">
                      <button
                        className={`dropdown-link flex items-center justify-center w-full text-[20px] ${
                          pathname.startsWith("/plants") ? "active" : ""
                        }`}
                        onClick={() =>
                          setMobileDropdownOpen(!mobileDropdownOpen)
                        }
                      >
                        Plants
                        <svg
                          className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                            mobileDropdownOpen ? "rotate-180" : ""
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
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 w-full">
                              <ol className="flex flex-col">
                                {categories.map((cat) => (
                                  <li key={cat.slug}>
                                    <Link
                                      href={`/categories/${cat.slug}`}
                                      className="block text-center px-4 py-3 !text-[var(--txt-orange)] transition-colors duration-200"
                                      onClick={() => {
                                        setMobileOpen(false);
                                        setMobileDropdownOpen(false);
                                      }}
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className={`dropdown-link ${
                          pathname === "/about" ? "active" : ""
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className={`dropdown-link ${
                          pathname === "/contact" ? "active" : ""
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Contact
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
