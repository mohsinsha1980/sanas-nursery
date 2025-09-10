import { CATEGORY_ARR } from "@/lib/constants";
import Image from "next/image";
import React from "react";

const CategoryHero = ({ categoryValue }: { categoryValue: string }) => {
  const category = CATEGORY_ARR.find((cat) => cat.value === categoryValue);

  return (
    <div key="hero">
      <div className="relative w-full h-[500px]">
        <Image
          src={category?.picture as string}
          alt=""
          fill
          className="lg:h-full lg:w-full object-cover"
        />
      </div>
    </div>
  );
};

export default CategoryHero;
