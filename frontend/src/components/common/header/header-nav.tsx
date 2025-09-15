"use client";
import { CATEGORY_ARR } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
            className={`flex items-center gap-1 ${
              pathname.startsWith("/plants") ? "active" : ""
            }`}
          >
            <span>Plants </span>
          </Link>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 mt-3 w-48 h-fit rounded-md bg-white border-2 border-gray-200 shadow-lg z-50 p-2"
              >
                <ol className="flex flex-col items-start text-center mb-2 gap-y-2">
                  {CATEGORY_ARR.map((cat) => (
                    <li key={cat.value}>
                      <Link
                        href={`/categories/${cat.value}`}
                        className=" px-4 text-gray-800 "
                      >
                        {cat.label}
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
            className={pathname === "/contact-us" ? "active" : ""}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link href="/blogs" className={pathname === "/blogs" ? "active" : ""}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
