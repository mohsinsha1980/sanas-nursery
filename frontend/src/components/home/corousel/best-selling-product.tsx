"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";
import "./carousel.css";

const BestSellingProduct = () => {
  const items = [
    { src: "/plant1.png", title: "Plant 1" },
    { src: "/plant2.png", title: "Plant 2" },
    { src: "/plant3.png", title: "Plant 3" },
    { src: "/plant4.webp", title: "Plant 4" },
  ];

  useEffect(() => {
    const slide = document.querySelectorAll(".slider-single");
    const slideTotal = slide.length - 1;
    let slideCurrent = 0;

    function setClasses() {
      const preactiveSlide = slideCurrent > 0 ? slide[slideCurrent - 1] : slide[slideTotal];
      const activeSlide = slide[slideCurrent];
      const proactiveSlide = slideCurrent < slideTotal ? slide[slideCurrent + 1] : slide[0];

      slide.forEach((elem) => {
        elem.className = "slider-single proactivede";
      });

      preactiveSlide.className = "slider-single preactive";
      activeSlide.className = "slider-single active";
      proactiveSlide.className = "slider-single proactive";
    }

    function slideRight() {
      slideCurrent = slideCurrent < slideTotal ? slideCurrent + 1 : 0;
      setClasses();
    }

    function slideLeft() {
      slideCurrent = slideCurrent > 0 ? slideCurrent - 1 : slideTotal;
      setClasses();
    }

    setClasses();

    const left = document.querySelector(".slider-left");
    const right = document.querySelector(".slider-right");
    left?.addEventListener("click", slideLeft);
    right?.addEventListener("click", slideRight);

    return () => {
      left?.removeEventListener("click", slideLeft);
      right?.removeEventListener("click", slideRight);
    };
  }, []);

  return (
    <div className="h-full w-full lg:pt-25 lg:pb-20 md:pt-20 md:pb-20 pt-10 pb-10 flex justify-center bg-[#E4FFF0] ">
      <div className="lg:max-w-[1100px] w-[95%] ">
        {/* Heading */}
        <div className="text-center mb-10 ">
          <h1 className="text-[#00611F] lg:text-[42px] text-[28px] font-semibold">
            Best Selling <span className="text-black">Products</span>
          </h1>
          <p className="text-[#505050] lg:text-[20px] text-[16px] font-semibold">
            Find what you are looking for
          </p>
        </div>

        {/* Carousel */}
        <div className="slider-container relative flex items-center justify-center ">
          {/* Left Arrow */}
          <div className="slider-left absolute left-2 lg:top-[45%] md:top-[40%] lg:-translate-y-1/2  z-20 cursor-pointer">
            <CircleArrowLeft className="h-12 w-12 text-[#00611F]" />
          </div>

          <div className="slider-content relative w-full flex items-center justify-center">
            {items.map((item, i) => (
              <div className="slider-single" key={i}>
                <Image
                  src={item.src}
                  alt={item.title}
                  width={330}
                  height={500}
                  className="slider-single-image rounded-lg object-cover"
                />
                <p className="text-[#505050] text-[20px] font-semibold mt-2 text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="slider-right absolute lg:right-2 md:right-2 lg:top-[45%] md:top-[40%] lg:-translate-y-1/2 z-20 cursor-pointer">
            <CircleArrowRight className="h-12 w-12 text-[#00611F]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;
