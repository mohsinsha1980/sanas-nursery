"use client";
import Image from "next/image";
import React, { useState } from "react";

const WhyChoose = () => {
  const data = [
    {
      img: "/site/about/div5h.png",
      imgonhover: "/site/about/div5.png",
      title: "Quality Assurance",
      desc: "Healthy plants with expert care and rigorous quality standards",
    },
    {
      img: "/site/about/div2h.png",
      imgonhover: "/site/about/div2.png",
      title: "Wide Variety",
      desc: "Extensive selection of plants for every space and preference",
    },
    {
      img: "/site/about/div3h.png",
      imgonhover: "/site/about/div3.png",
      title: "Affordable Prices",
      desc: "Competitive pricing without compromising on quality",
    },
    {
      img: "/site/about/div4h.png",
      imgonhover: "/site/about/div4.png",
      title: "Eco-Friendly",
      desc: "Sustainable growing methods and environmentally conscious practices",
    },
    {
      img: "/site/about/div5h.png",
      imgonhover: "/site/about/div5.png",
      title: "Local Trust",
      desc: "Strong community relationships and trusted local expertise",
    },
  ];

                const [hover, setHover] = useState(false);


  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-white">
        <div className="h-[430px] max-w-[1370px] md:w-[90%] w-[100%] flex flex-col justify-between">
          {/* Heading */}
          <div className="h-fit w-full flex flex-col justify-center items-center">
            <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
              Why Choose <span className="text-[#00611F]">Sanas Nursery</span>
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
              Five reasons why we&apos;re your perfect gardening partner
            </p>
          </div>

          {/* Cards */}
          <div className="h-[285px] w-full flex justify-between flex-wrap gap-4 lg:gap-0">
            {data.map((item, i) => {

              return (
                <div
                  key={i}
                  className="flex-1 min-w-[200px] max-w-[250px] flex justify-center items-center border-2 border-[#4CBA9B] rounded-lg hover:bg-[#4CBA9B] transition-colors duration-300"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className="w-[170px] h-[227px] flex flex-col justify-evenly items-center text-center ">
                    <Image
                      src={hover ? item.img : item.imgonhover}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="mb-4 w-[64px] h-[64px]"
                    />
                    <h3
                      className={`font-semibold lg:text-[20px] text-[16px] mb-2 ${
                        hover ? "text-white" : "text-[#323F32]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`lg:text-[16px] text-[14px] ${
                        hover ? "text-white" : "text-[#505050]"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
