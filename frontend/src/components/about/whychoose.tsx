"use client";
import { data } from "@/lib/constants";
import Image from "next/image";
import React, { useState } from "react";

const WhyChoose = () => {


  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-white px-4 ">
        <div className="lg:h-full h-full max-w-[1200px] md:w-[90%] w-[100%] flex flex-col justify-between items-center lg:gap-y-10 md:gap-y-10 gap-y-5 ">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
              Why Choose <span className="text-[#00611F]">Sanas Nursery</span>
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
              Five reasons why we&apos;re your perfect gardening partner
            </p>
          </div>

          {/* Cards */}
          <div className=" h-full w-full flex flex-wrap gap-4 justify-center items-center ">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex-1 h-[260px] lg:min-w-[220px] md:min-w-[230px] min-w-[250px] lg:max-w-[200px] max-w-[230px] flex justify-center items-center border-2 border-[#4CBA9B] rounded-lg md:hover:bg-[#4CBA9B] transition-colors duration-300 "
                onMouseEnter={() =>
                  window.innerWidth >= 768 && setHoveredIndex(i)
                }
                onMouseLeave={() =>
                  window.innerWidth >= 768 && setHoveredIndex(null)
                }
              >
                <div className="w-[170px] h-[227px] flex flex-col lg:justify-evenly justify-center-safe items-center text-center ">
                  <Image
                    src={hoveredIndex === i ? item.img : item.imgonhover}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="mb-4 w-[64px] h-[64px]"
                  />
                  <h3
                    className={`font-semibold lg:text-[20px] text-[16px] mb-2 ${
                      hoveredIndex === i && window.innerWidth >= 768
                        ? "text-white"
                        : "text-[#323F32]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`lg:text-[16px] text-[14px] ${
                      hoveredIndex === i && window.innerWidth >= 768
                        ? "text-white"
                        : "text-[#505050]"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
