"use client";
import Link from "next/link";

const categories = [
  { name: "Fruit Trees", slug: "fruit-trees", image: "/plant3.png" },
  { name: "Flower Trees", slug: "flower-trees", image: "/plant2.png" },
  { name: "Shadow Trees", slug: "shadow-trees", image: "/plant1.png" },
  { name: "Show Trees", slug: "show-trees", image: "/plant3.png" },
  { name: "Masala", slug: "masala", image: "/plant2.png" },
  { name: "Others", slug: "others", image: "/plant1.png" },
];

export default function Categories() {
  return (
    <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10  flex flex-row justify-center   border-2 border-amber-400">
      <div className="h-full lg:max-w-[80%] lg:min-w-[1200px] md:w-[90%] w-[95%]     border-2 border-red-400">
        <div className="h-full w-full  flex flex-col justify-center items-center lg:pb-10  border-2 border-amber-400">
          <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            Choose Your <span className="text-[#00611F]">Plant</span> Family
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold">
            Select from handpicked categories that suit your style and needs
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="relative w-[150px] sm:w-[170px] md:w-[180px] lg:w-[200px] h-[150px] sm:h-[170px] md:h-[180px] lg:h-[200px] rounded-full overflow-hidden group">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
                </div>
                <p className="mt-4 text-center font-semibold">{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
