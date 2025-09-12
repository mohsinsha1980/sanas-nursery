"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/lib/constants";

export default function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav>
      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6">
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
          <Link
            href="#categories-section"
            className={pathname.startsWith("/plants") ? "active" : ""}
          >
            Plants
          </Link>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 mt-3 w-48 h-fit rounded-md border border-gray-200 bg-white shadow-lg z-50 "
              >
                <ol className="flex flex-col items-start text-center mb-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="block px-4 py-2 text-gray-800"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
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
            href="/contact-us"
            className={pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/blogs"
            className={pathname === "/contact" ? "active" : ""}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
