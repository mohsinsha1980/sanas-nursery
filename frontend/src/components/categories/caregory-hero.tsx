import { CATEGORY_ARR } from "@/lib/constants";
import Image from "next/image";
import React from "react";

const CategoryHero = ({ categoryValue }: { categoryValue: string }) => {
  const category = CATEGORY_ARR.find((cat) => cat.value === categoryValue);

  return (
    <div key="hero">
      <div className="relative">
        <Image
          src={category?.picture as string}
          alt=""
          fill
          className="lg:h-full lg:w-full"
        />
        <div className="z-1 absolute top-[40%] left-[11%] lg:w-[611px] lg:h-[385px] space-y-4">
          <h2 className="text-[#0D6536] lg:text-[64px] font-bold leading-18">
            {category?.label}
          </h2>
          <p className="text-[#505050] lg:text-[20px] font-medium">
            Explore a variety of fruit trees perfect for your garden
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
