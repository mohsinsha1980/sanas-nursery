import React from "react";
import Image from "next/image";

const CollectionSection = () => {
  return (
    <div
      className="w-full flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(228, 255, 240, 1)", height: "672px" }}
    >
      <div className="max-w-[1370px] w-full flex flex-col md:flex-row gap-6">
        {/* LEFT CARD */}
        <div className="relative w-full md:w-1/2 h-[350px] sm:h-[420px] md:h-[472px] rounded-2xl overflow-hidden">
          <Image
            src="/site/home/collection/collecton-banner1.webp"
            alt="Left collection background"
            fill
            priority
            className="object-cover"
          />

          {/* Full-width overlay */}
          <div
            className="absolute bottom-0 left-0 w-full bg-[rgba(255,255,255,0.2)] text-white flex flex-col items-start justify-center text-left p-6 sm:p-8 md:p-10"
            style={{ height: "237px" }}
          >
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-3 sm:mb-4">
              Summer Special Green
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-4 sm:mb-6">
              Fresh, lush plants perfect for the summer season.
            </p>
            <button className="border border-white text-white text-base w-[140px] h-[46px] rounded transition duration-300 hover:bg-white hover:text-green-700">
              View Collection
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative w-full md:w-1/2 h-[350px] sm:h-[420px] md:h-[472px] rounded-2xl overflow-hidden">
          <Image
            src="/site/home/collection/collection-banner2.webp"
            alt="Right collection background"
            fill
            priority
            className="object-cover"
          />

          {/* Full-width overlay */}
          <div
            className="absolute bottom-0 left-0 w-full bg-[rgba(76,186,155,0.68)] text-white flex flex-col items-start justify-center text-left p-6 sm:p-8 md:p-10"
            style={{ height: "237px" }}
          >
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-3 sm:mb-4">
              Monsoon Special Green
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-4 sm:mb-6">
              Fresh, lush plants perfect for the rainy season.
            </p>
            <button className="bg-[rgba(243,117,33,1)] text-white text-base w-[140px] h-[46px] rounded transition duration-300 hover:bg-white hover:text-[rgba(243,117,33,1)] border border-[rgba(243,117,33,1)]">
              View Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
