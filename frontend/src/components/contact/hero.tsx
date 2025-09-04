import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src="/home-hero.webp"
          alt=""
          width={1920}
          height={1013}
          className="lg:h-full lg:w-full"
        />
        <div className="z-1 absolute top-[32%] left-[11%] lg:w-[611px] lg:h-[385px] space-y-4">
          <p className="text-[#F37521] lg:text-[16px] font-medium">
            Love for Nature
          </p>
          <h1 className="text-[#354733] lg:text-[64px] font-bold leading-18">
            Where Every Leaf Tells a Story
          </h1>
          <p className="text-[#505050] lg:text-[20px] font-medium">
            From lush indoor greens to vibrant flowering plants, our curated
            collection is designed to brighten your space, purify your air, and
            bring the calming touch of nature into your everyday life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
