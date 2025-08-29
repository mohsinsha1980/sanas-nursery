"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BestSellingProduct: React.FC = () => {
  const items = [
    { src: "/plant1.png", title: "Plant 1" },
    { src: "/plant2.png", title: "Plant 2" },
    { src: "/plant3.png", title: "Plant 3" },
    { src: "/plant1.png", title: "Plant 4" },
    { src: "/plant2.png", title: "Plant 5" },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleRight = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleLeft = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getIndex = (index: number) => {
    return (index + items.length) % items.length;
  };

  return (
    <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0]">
      <div className="inner-div-best-selling h-full lg:w-[60%] md:w-[90%] w-[95%]">
        <div className="h-fit w-full flex flex-col items-center pt-5 lg:pb-15 pb-5 space-y-1">
          <h1 className="text-[#00611F] lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            Best Selling <span className="text-black">Products</span>
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold">
            Find what you are looking for
          </p>
        </div>

        <div className="hidden md:flex relative h-[622px] w-full items-center justify-center overflow-hidden">
          <CircleArrowLeft
            onClick={handleLeft}
            className="absolute top-[37%] lg:left-5 md:left-10 h-12 w-12 cursor-pointer z-20 text-[#00611F]"
          />

          {[getIndex(activeIndex - 1), activeIndex, getIndex(activeIndex + 1)].map(
            (index, pos) => {
              let style = "";
              if (pos === 0)
                style = "left-[25%] -translate-x-1/2 top-0 z-10"; // left
              if (pos === 1)
                style = "left-1/2 -translate-x-1/2 top-10 z-20"; // center
              if (pos === 2)
                style = "left-[75%] -translate-x-1/2 top-0 z-10"; // right

              return (
                <motion.div
                  key={items[index].src + index}
                  layout
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className={`absolute h-[500px] w-[330px] flex flex-col items-center ${style}`}
                >
                  <Image
                    src={items[index].src}
                    alt={items[index].title}
                    width={330}
                    height={500}
                    className="h-full w-full object-cover rounded-lg shadow-lg"
                  />
                  <p className="text-[#505050] text-[20px] font-semibold mt-2">
                    {items[index].title}
                  </p>
                </motion.div>
              );
            }
          )}

          <CircleArrowRight
            onClick={handleRight}
            className="absolute top-[37%] lg:right-5 md:right-10 h-12 w-12 cursor-pointer z-20 text-[#00611F]"
          />
        </div>

        <div className="flex flex-col items-center justify-center md:hidden">
          <motion.div
            key={items[activeIndex].src + activeIndex}
            layout
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-[400px] w-[280px] flex flex-col items-center"
          >
            <Image
              src={items[activeIndex].src}
              alt={items[activeIndex].title}
              width={280}
              height={400}
              className="h-full lg:w-full w-[100%]  object-cover rounded-lg shadow-lg"
            />
            <p className="text-[#505050] text-[18px] font-semibold mt-2">
              {items[activeIndex].title}
            </p>
          </motion.div>

          <div className="flex flex-row justify-between items-center mt-10 w-[70%] ">
            <CircleArrowLeft
              onClick={handleLeft}
              className="h-10 w-10 cursor-pointer text-[#00611F]"
            />
            <CircleArrowRight
              onClick={handleRight}
              className="h-10 w-10 cursor-pointer text-[#00611F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;
