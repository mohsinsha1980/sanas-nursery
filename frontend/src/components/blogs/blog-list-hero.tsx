import { HERO } from "@/assets";
import { Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

const BlogListHero = () => {
  return (
    <div className="relative w-full h-[70vh]">
      <Image
        src={HERO.BLOGS}
        height={1700}
        width={1700}
        alt="Gardening Tips & Plant Care Blog - Expert Advice from Sanas Nursery Plant Experts"
        priority={true}
        className="h-[70vh] w-full object-cover object-center"
      />
      <div className="z-10 lg:w-[1200px] w-[100%] h-fit absolute lg:top-[55%] top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <div
          className="z-1 absolute p-8 rounded-lg
        lg:w-[711px] lg:h-[385px] lg:top-[50%] lg:left-[28%] lg:space-y-6 lg:bg-transparent lg:backdrop-blur-none
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm"
        >
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-normal leading-tight md:text-start text-center">
            Our Blogs
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[20px] font-normal md:text-start text-center">
            Discover expert gardening tips, plant care guides, and nursery
            insights to help you grow a thriving garden.
          </p>
          <div className="flex items-center justify-between gap-7 lg:gap-15 text-[#505050] lg:text-[22px] md:text-[20px] text-[20px] font-medium ">
            <div className="w-full h-full flex items-center gap-2">
              <TrendingUp className="lg:h-7 lg:w-10 h-6 w-9" />
              <span className="text-[15px] lg:text-md font-semibold">
                Expert Tips
              </span>
            </div>
            <div className="w-full h-full flex items-center gap-2">
              <Sparkles className="lg:h-7 lg:w-10 h-5 w-7" />
              <p className="text-[15px] lg:text-md font-semibold whitespace-nowrap">
                Fresh Content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListHero;
