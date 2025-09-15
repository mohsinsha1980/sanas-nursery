import { getPicURL } from "@/lib/helper";
import { GreenChoicePlant } from "@/lib/types/public-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlantCard = ({ plant }: { plant: GreenChoicePlant }) => {
  return (
    <Link
      key={plant._id}
      href={`/categories/${plant.category}/${plant.slug}/${plant._id}`}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className="w-full md:w-[240px] lg:w-[250px] h-[300px] sm:h-[320px] md:h-[350px] lg:h-[375px] rounded-[10px] overflow-hidden transition-transform duration-300 hover:scale-105 group px-0">
        <div className="relative w-full h-full">
          <Image
            src={getPicURL(plant.pictures[0])}
            alt={plant.title}
            fill
            className="rounded-[10px] object-cover"
          />
          <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-[10px]"></div>
        </div>
      </div>
      <p className="mt-4 text-center text-lg font-medium text-gray-700 ">
        {plant.title}
      </p>
    </Link>
  );
};

export default PlantCard;
