import { CATEGORY_ARR } from "@/lib/constants";
import Image from "next/image";

const CategoryHero = ({ categoryValue }: { categoryValue: string }) => {
  const category = CATEGORY_ARR.find((cat) => cat.value === categoryValue);
  return (
    <div key="hero">
      <div className="relative w-full lg:h-[500px] h-screen">
        <div className="z-10 absolute lg:w-[800px] w-full h-fit lg:top-[35%] top-[40%] -translte-y-1/2 lg:left-[5%] ">
          <h1 className="text-[#354733] lg:text-[48px] md:text-[50px] text-[40px] font-bold lg:leading-15 leading-13 md:text-start text-center">
            {category?.title as string}
          </h1>
          <p className="text-[#505050] lg:text-[22px] md:text-[20px] text-[20px] font-semibold md:text-start text-center lg:mt-5">
            {category?.description as string}
          </p>
        </div>
        <div className="relative w-full h-[600px] sm:h-[550px] md:h-[500px] lg:h-[550px] xl:h-[550px]">
          {/* Background Image */}
          <Image
            src={category?.heroImage as string}
            alt={category?.title || "Category Banner"}
            fill
            className="object-cover"
            priority
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content Container - positioned below header */}
          <div className="relative z-10 h-full flex items-center pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <div className="bg-white/80 backdrop-blur-sm text-center md:text-left md:backdrop-blur-none p-4 sm:p-6 lg:p-8 rounded-lg lg:bg-transparent md:max-w-lg lg:max-w-2xl">
                  <h1 className="text-[#354733] text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6">
                    {category?.title as string}
                  </h1>
                  <p className="text-[#505050] text-md sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed">
                    {category?.description as string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
