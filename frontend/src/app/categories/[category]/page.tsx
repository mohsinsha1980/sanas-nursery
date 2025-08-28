"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


// Dummy 100 plants data (you can replace with real images)
const plants = {
  "fruit-trees": Array.from({ length: 32 }, (_, i) => ({
    id: `fruit${i + 1}`,
    name: `Fruit Plant ${i + 1}`,
    image: `/plant${(i % 3) + 1}.png`, // reuse 5 sample images
  })),
  "flower-trees": Array.from({ length: 32 }, (_, i) => ({
    id: `flower${i + 1}`,
    name: `Flower Plant ${i + 1}`,
    image: `/images/flower${(i % 5) + 1}.png`,
  })),
};

export default function CategoryPage() {
  const { category } = useParams();
  console.log(category);
  const plantList =
    typeof category === "string" && category in plants
      ? plants[category as keyof typeof plants]
      : [];

      console.log(category)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Calculate items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = plantList.slice(startIndex, startIndex + itemsPerPage);

  // Total pages
  const totalPages = Math.ceil(plantList.length / itemsPerPage);

  return (
    <div>
      <div key="hero" >
        <div className="relative">
          <Image
            src="/home-hero.webp"
            alt=""
            width={1920}
            height={1013}
            className="lg:h-full lg:w-full"
          />
          <div className="z-1 absolute top-[40%] left-[11%] lg:w-[611px] lg:h-[385px] space-y-4">
            <h1 className="text-[#0D6536] lg:text-[64px] font-bold leading-18">{category} Collection </h1>
            <p className="text-[#505050] lg:text-[20px] font-medium">Explore a variety of fruit trees perfect for your garden</p>
          </div>
        </div>
      </div>

      <div key="plant-list-main-div" className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-col justify-center items-center">
        <div key="heading">
          <h1 className="text-[#0D6536] lg:text-[42px] font-semibold ">{category}</h1>
        </div>
        <div key="filter-list-sort" className="relative  w-[70%] h-full ">
          <div key="filterText-and-sortDropdown" className="w-full h-full flex justify-between items-center pb-6 px-4">
            <div>
              <h1 className="text-[#1D2F33] lg:text-[30px] md:text-[36px] text-[28px] font-semibold">Filters</h1>
            </div>
            <div className="relative w-[112px]">
              <select className="w-full h-[30px] rounded  text-[18px] font-bold cursor-pointer ">
                <option value="">Sort</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="date-new">Newest First</option>
                <option value="date-old">Oldest First</option>
              </select>
            </div>
          </div>
          <div key="filter-and-list" className="h-full w-full flex justify-between ">
            <div key="filter-div" className="w-[14%] h-[100%] space-y-10">
              <div key="checkbox-div1" className="w-full h-auto shadow-2xl p-5 rounded-xl">
                <h1 className="text-[#1D2F33] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mb-3">Plant Type</h1>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Fruit Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Shade Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Outdoor Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Flowering Plants</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Indoor Plants</span>
                  </label>
                </div>

              </div>
              <div key="checkbox-div2" className="w-full h-auto shadow-2xl p-5 rounded-xl">
                <h1 className="text-[#1D2F33] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mb-3">Plant Type</h1>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Fruit Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Shade Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Outdoor Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Flowering Plants</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Indoor Plants</span>
                  </label>
                </div>

              </div>
              <div key="checkbox-div3" className="w-full h-auto shadow-2xl p-5 rounded-xl">
                <h1 className="text-[#1D2F33] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mb-3">Plant Type</h1>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Fruit Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Shade Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Outdoor Trees</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Flowering Plants</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-2 border-orange-500 rounded accent-orange-500 checked:bg-orange-500 checked:text-white"
                    />
                    <span className="peer-checked:text-orange-500">Indoor Plants</span>
                  </label>
                </div>

              </div>
            </div>
            <div key="list-div" className="w-[82%] h-[100%] flex flex-col justify-center ">
              <div className="grid grid-cols-4 gap-6">
                {currentItems.length > 0 ? (
                  currentItems.map((plant) => (
                    <Link key={plant.id} href={`/categories/${category}/${plant.id}`}>
                      <div className="w-[250px] h-[417px] rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden group">
                        {/* Image Wrapper */}
                        <div className="relative w-[90%] h-[90%] overflow-hidden rounded-lg">
                          {/* Plant Image */}
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                          />

                          {/* Overlay (appears on hover) */}
                          <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
                        </div>

                        {/* Plant Name */}
                        <p className="text-[#505050] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mt-2 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
                          {plant.name}
                        </p>
                      </div>



                    </Link>
                  ))
                ) : (
                  <p>No plants found in this category.</p>
                )}
              </div>
              <div key="pagination">
                <div className="flex justify-center mt-6 space-x-10   ">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-[50px] h-[50px] rounded-xl ${currentPage === i + 1
                        ? "bg-[#F37521] text-white text-xl"
                        : "bg-[#FFD7BC] text-black text-xl"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div >
  );
}


