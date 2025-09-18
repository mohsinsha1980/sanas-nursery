import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { HERO } from "@/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-[70vh]">
      <Image
        src={HERO.ABOUT}
        height={1500}
        width={1500}
        alt=""
        className="h-[70vh] w-full object-cover object-center"
      />
      <div className="z-10 lg:w-[1200px] w-[100%] h-fit absolute lg:top-[55%] top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <div
          className="z-1 absolute bg-white/50 bg-opacity-50 p-8 rounded-lg lg:bg-transparent
              lg:w-[711px] lg:h-[385px] lg:top-[50%] lg:left-[28%] lg:space-y-4
              md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
              w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-normal leading-tight md:text-start text-center">
            We&apos;re Just a Message Away!
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[18px] font-normal md:text-start text-center lg:pb-2">
            Have questions or want to stay updated? We&apos;d love to hear from
            you!
          </p>
          <Button variant={"orange"} type="button" size="lg">
            <Link href="#contact-form">Let&apos;s Connect</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
