"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { HomeGallery } from "@/lib/types/public-types";
import { defultHomeData } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";

export default function HomeGallerySection({
  gallery,
}: {
  gallery: HomeGallery;
}) {
  const images = [];

  if (gallery.G1) {
    images.push(getPicURL(gallery.G1));
  } else {
    images.push(defultHomeData.Gallery.G1);
  }

  if (gallery.G2) {
    images.push(getPicURL(gallery.G2));
  } else {
    images.push(defultHomeData.Gallery.G2);
  }

  if (gallery.G3) {
    images.push(getPicURL(gallery.G3));
  } else {
    images.push(defultHomeData.Gallery.G3);
  }

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
    <section className="w-full flex lg:pt-26 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 justify-center bg-white ">
      <div className="w-full max-w-[1920px] flex flex-col items-center justify-center px-4 md:px-8 ">
        <div className="text-center lg:mb-12 md:mb-10 mb-5 ">
          <h2 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            <span className="text-[rgba(0,97,31,1)]">Green</span> Moments
            Gallery
          </h2>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:text-start text-center">
            A glimpse of our plants thriving in homes, gardens, and happy
            spaces.
          </p>
        </div>

        <div className="w-full max-w-[1200px] flex items-center justify-center    ">
          <div className="grid grid-cols-1 lg:grid-cols-[529px_828px] gap-4 max-w-[1200px] w-full    ">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer    "
              onClick={() => setSelectedIndex(0)}
            >
              <Image
                src={images[0]}
                alt="Gallery Big"
                width={529}
                height={793}
                className="w-full lg:h-[793px] h-auto object-cover transition-transform duration-500 hover:scale-105    "
              />
            </motion.div>

            <div className="flex flex-col gap-4 lg:w-[78%] w-full ">
              {images.slice(1).map((img, i) => (
                <motion.div
                  key={i + 1}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: (i + 1) * 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden shadow-md cursor-pointer lg:h-[389px] h-auto    "
                  onClick={() => setSelectedIndex(i + 1)}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i + 2}`}
                    width={500}
                    height={389}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105    "
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedIndex !== null && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
              onClick={handleNext}
            >
              <ChevronRight size={40} />
            </button>

            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt="Full View"
              className="max-w-full max-h-[70vh] rounded-lg shadow-lg    "
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
