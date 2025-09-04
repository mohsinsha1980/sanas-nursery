import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CollectionSection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 bg-[rgba(228,255,240,1)]">
      <div className="max-w-[1200px] w-full h-full flex flex-col md:flex-col lg:flex-row justify-between items-center gap-15 md:px-10">
        {/* LEFT CARD */}
        <div className="relative lg:w-full md:w-[80%] md:h-[472px] h-[350px] w-[95%] rounded-2xl overflow-hidden group ">
          <Image
            src="/site/home/collection/collecton-banner1.webp"
            alt="Left collection background"
            fill
            priority
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />

          {/* Full-width overlay */}
          <div
            className="absolute bottom-0 left-0 w-full bg-transparent group-hover:bg-[rgba(255,255,255,0.5)] group-hover:scale-y-90 origin-bottom transition-all duration-400 ease-in-out text-white group-hover:text-black flex flex-col items-start justify-center text-left p-4 md:p-10"
            style={{ height: "230px" }}
          >
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-3 sm:mb-3">
              Summer Special Green
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-4 sm:mb-3">
              Fresh, lush plants perfect for the summer season.
            </p>
            <Button variant="secondary" size="lg" className="w-fit">
              View Collection
            </Button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative lg:w-full md:w-[80%] md:h-[472px] h-[350px] w-[95%] rounded-2xl overflow-hidden group">
          <Image
            src="/site/home/collection/collection-banner2.webp"
            alt="Right collection background"
            fill
            priority
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />

          {/* Full-width overlay */}
          <div
            className="absolute bottom-0 left-0 w-full group-hover:bg-[rgba(76,186,155,0.70)] group-hover:scale-y-90 origin-bottom transition-all duration-400 ease-in-out text-black group-hover:text-white flex flex-col items-start justify-center text-left p-6 sm:p-8 md:p-10"
            style={{ height: "235px" }}
          >
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-3 sm:mb-4">
              Monsoon Special Green
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-4 sm:mb-6">
              Fresh, lush plants perfect for the rainy season.
            </p>
            <Button variant="orange" size="lg">
              View Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
