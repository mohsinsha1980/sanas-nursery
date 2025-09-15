import { HERO } from "@/assets";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={HERO.ABOUT}
        height={1500}
        width={1500}
        alt=""
        className="h-screen w-full"
      />
      <div
        className="z-1 absolute bg-white/50 bg-opacity-50 p-8 rounded-lg lg:bg-transparent
        lg:w-[711px] lg:h-[385px] lg:t op-[50%] lg:left-[28%] lg:space-y-4
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center"
      >
        <h1 className="lg:text-[60px] md:text-[50px] text-[30px] font-bold lg:leading-18 leading-10 md:text-start text-center">
          Your Go-To <span className="text-[#00611F]">Plants and Trees</span>{" "}
          Supplier in Uruli Kanchan – Sanas Nursery.
        </h1>
        <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[18px] font-medium md:text-start text-center">
          Building trust with healthy plants and trees that thrive in farms,
          landscapes, and gardens.{" "}
        </p>
      </div>
    </div>
  );
};

export default Hero;
