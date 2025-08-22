"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* Plants link with underline hover */}
          <Link
            href="/plants"
            className={pathname.startsWith("/plants") ? "active" : ""}
          >
            Plants
          </Link>

          {/* Animated dropdown - no underline here */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-50"
              >
                <ol className="flex flex-col items-center text-center">
                  <li>
                    <Link
                      href="/plants/indoor"
                      className="block px-4 py-2 text-gray-800  "
                    >
                      Indoor Plants
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/plants/outdoor"
                      className="block px-4 py-2 text-gray-800  "
                    >
                      Outdoor Plants
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/plants/succulents"
                      className="block px-4 py-2 text-gray-800 "
                    >
                      Succulents
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/plants/succulents"
                      className="block px-4 py-2 text-gray-800 "
                    >
                      Shodow Plants
                    </Link>
                  </li>
                </ol>
              </motion.div>

            )}
          </AnimatePresence>
        </li>

        <li>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
