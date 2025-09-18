import React from "react";
import Image from "next/image";
import { ABOUT } from "@/assets";

const Mission = () => {
  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0]  ">
        <div className="lg:h-[485px] h-full max-w-[1200px] md:w-[90%] w-[100%] flex flex-col justify-between">
          <div className="h-fit w-full flex flex-col justify-center items-center lg:pb-10 md:pb-8 pb-5">
            <h1 className="lg:text-[42px] md:text-[38px] text-[28px] font-semibold text-center">
              <span className="text-[#00611F]">Mission</span> &
              <span className="text-[#00611F]">Vision</span>
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[18px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center md:mt-2">
              A glimpse of our plants thriving in homes, gardens, and happy
              spaces.{" "}
            </p>
          </div>
          <div className="lg:h-[409px] h-full w-full flex md:flex-row flex-col justify-between items-center lg:gap-y-0 md:gap-x-6 gap-y-5 px-5">
            <div className="h-[349px] lg:w-[656px] md:w-[48%] w-full bg-[#4CBA9B] flex justify-center items-center rounded-lg px-3">
              <div className="h-[286px] w-full max-w-[560px]">
                <div className="h-full w-full flex flex-col justify-between items-center">
                  <Image
                    src={ABOUT.MISSION}
                    alt={""}
                    height={100}
                    width={100}
                    className="h-[64px] w-[64px] object-cover rounded-full"
                  />
                  <h1 className="text-white lg:text-[32px] md:text-[24px] text-[21px] font-bold text-center">
                    Our Mission
                  </h1>
                  <p className="text-white lg:text-[20px] md:text-[16px] text-[16px] font-medium text-center leading-relaxed">
                    Our mission is to make large-scale greenery projects
                    successful by providing high-quality plants and expert
                    support, while encouraging sustainable practices that
                    benefit people and the environment.
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[349px] lg:w-[656px] w-full md:w-[48%] bg-[#4CBA9B] flex justify-center items-center rounded-lg px-3">
              <div className="h-[286px] w-full max-w-[560px]">
                <div className="h-full w-full flex flex-col justify-between items-center">
                  <Image
                    src={ABOUT.VISION}
                    alt={""}
                    height={100}
                    width={100}
                    className="h-[64px] w-[64px] object-cover rounded-full"
                  />
                  <h1 className="text-white lg:text-[32px] md:text-[24px] text-[21px] font-bold text-center">
                    Our Vision
                  </h1>
                  <p className="text-white lg:text-[20px] md:text-[16px] text-[16px] font-medium text-center leading-relaxed">
                    We envision becoming a trusted partner for urban and rural
                    greening across India—helping create thriving landscapes,
                    sustainable plantations, and healthier communities for
                    generations to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
