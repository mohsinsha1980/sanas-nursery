"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const images = [
    "/site/home/gallery/gallery1.webp",
    "/site/home/gallery/gallery2.webp",
    "/site/home/gallery/gallery3.webp",
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="w-full flex justify-center bg-white py-10">
      <div className="w-full max-w-[1920px] flex flex-col items-center justify-center px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold">
            <span className="text-[rgba(0,97,31,1)]">Green</span> Moments
            Gallery
          </h2>
          <p className="text-gray-600 mt-4 text-[16px] md:text-[18px] lg:text-[20px]">
            A glimpse of our plants thriving in homes, gardens, and happy
            spaces.
          </p>
        </div>

        {/* Grid */}
        <div className="w-full max-w-[1486px] flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-[529px_828px] gap-4 max-w-[1374.53px] w-full">
            {/* Left Big Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer"
              onClick={() => setSelectedIndex(0)}
            >
              <Image
                src={images[0]}
                alt="Gallery Big"
                width={529}
                height={793}
                className="w-full lg:h-[793px] h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            <div className="flex flex-col gap-4 lg:h-[793px]">
              {images.slice(1).map((img, i) => (
                <motion.div
                  key={i + 1}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: (i + 1) * 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden shadow-md cursor-pointer lg:h-[389px] h-auto"
                  onClick={() => setSelectedIndex(i + 1)}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i + 2}`}
                    width={828}
                    height={389}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedIndex !== null && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>

            {/* Prev Arrow */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next Arrow */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
              onClick={handleNext}
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt="Full View"
              className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
