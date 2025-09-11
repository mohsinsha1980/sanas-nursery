import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <Image
        src="/about-hero.png"
        height={1500}
        width={1500}
        alt=""
        className="h-screen w-full"
      />
      <div className="z-10 absolute lg:left-[9%] top-1/2 -translate-y-1/2 lg:w-[600px] w-full h-fit flex flex-col justify-center items-center lg:pb-10  pb-5  ">
        <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold lg:text-start text-center">
          Your Go-To <span className="text-[#00611F]">Plants and Trees</span>{" "}
          Supplier in Uruli Kanchan – Sanas Nursery.
        </h1>
        <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
          Building trust with healthy plants and trees that thrive in farms,
          landscapes, and gardens.{" "}
        </p>
      </div>
    </div>
  );
};

export default Hero;
