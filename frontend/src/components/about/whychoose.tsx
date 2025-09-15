"use client";
import { ABOUT } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";

const WhyChoose = () => {
  const data = [
    {
      img: ABOUT.QUALITY_ASSURANCE,
      imgonhover: ABOUT.QUALITY_ASSURANCE_HOVER,
      title: "Quality Assurance",
      desc: "Healthy plants with expert care and rigorous quality standards",
    },
    {
      img: ABOUT.WIDE_VARIETY,
      imgonhover: ABOUT.WIDE_VARIETY_HOVER,
      title: "Wide Variety",
      desc: "Extensive selection of plants for every space and preference",
    },
    {
      img: ABOUT.AFFORDABLE_PRICES,
      imgonhover: ABOUT.AFFORDABLE_PRICES_HOVER,
      title: "Affordable Prices",
      desc: "Competitive pricing without compromising on quality",
    },
    {
      img: ABOUT.ECO_FRIENDLY,
      imgonhover: ABOUT.AFFORDABLE_PRICES,
      title: "Eco-Friendly",
      desc: "Sustainable growing methods and environmentally conscious practices",
    },
    {
      img: ABOUT.LOCAL_TRUST,
      imgonhover: ABOUT.LOCAL_TRUST_HOVER,
      title: "Local Trust",
      desc: "Strong community relationships and trusted local expertise",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-white px-2 ">
        <div className="lg:h-[430px] h-full max-w-[1370px] md:w-[90%] w-[100%] flex flex-col justify-between items-center lg:gap-y-0 md:gap-y-10 gap-y-5 ">
          <div className="h-fit w-full flex flex-col justify-center items-center">
            <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
              Why Choose <span className="text-[#00611F]">Sanas Nursery</span>
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
              Five reasons why we&apos;re your perfect gardening partner
            </p>
          </div>

          {/* Cards */}
          <div className="lg:h-[285px] h-full w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 justify-items-center items-center ">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex-1 h-[260px] lg:min-w-[250px] md:min-w-[230px] min-w-[250px] lg:max-w-[250px] max-w-[230px]  flex justify-center items-center border-2 border-[#4CBA9B] rounded-lg hover:bg-[#4CBA9B] transition-colors duration-300 "
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
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
                      hoveredIndex === i ? "" : "text-[#323F32]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`lg:text-[16px] text-[14px] ${
                      hoveredIndex === i ? "" : "text-[#505050]"
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
