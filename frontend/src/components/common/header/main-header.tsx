"use client";
import HeaderActions from "./header-actions";
import Logo from "../logo";
import HeaderNav from "./header-nav";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
  return (
    <header className="md:relative flex justify-center items-center w-full">
      <div
        className={`bg-nav fixed top-0 z-[50] transition-transform flex justify-center w-full  ${
          isScrolled
            ? "bg-white/30 backdrop-blur-md md:absolute md:translate-y-0 md:top-0"
            : "md:max-w-[var(--container-8xl)] md:px-[var(--spacing-lg)] mx-auto md:absolute md:translate-y-5 md:top-5"
        }
  `}
      >
        <div className="main_header w-[95%] ">
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
              {mobileOpen ? <X className="text-orange-500" size={28} /> : <Menu className="text-orange-500" size={28} />}
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
                    <li>
                      <Link
                        href="/plants"
                        className={`dropdown-link ${
                          pathname.startsWith("/plants") ? "active" : ""
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Plants
                      </Link>
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
