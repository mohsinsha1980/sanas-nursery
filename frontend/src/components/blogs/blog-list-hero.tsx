import { HERO } from "@/assets";
import { Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

const BlogListHero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={HERO.BLOGS}
        height={1700}
        width={1700}
        alt=""
        className="h-screen w-full object-cover object-center"
      />
      <div className="z-10 lg:w-[1200px] w-[100%] h-fit absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <div
          className="z-1 absolute p-8 rounded-lg
        lg:w-[711px] lg:h-[385px] lg:top-[50%] lg:left-[28%] lg:space-y-4 lg:bg-transparent lg:backdrop-blur-none
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm"
        >
          <h1 className="lg:text-[60px] md:text-[50px] text-[40px] font-bold lg:leading-18 leading-13 md:text-start text-center">
            Our Blogs
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[20px] font-medium md:text-start text-center">
            Discover expert gardening tips, plant care guides, and nursery
            insights to help you grow a thriving garden.
          </p>
          <div className="flex items-center justify-between gap-3 lg:gap-15 text-[#505050] lg:text-[22px] md:text-[20px] text-[20px] font-medium ">
            <div className="w-full h-full flex items-center gap-2">
              <TrendingUp className="h-7 w-10" />
              <span className="text-[15px] lg:text-md font-semibold">
                Expert Tips
              </span>
            </div>
            <div className="w-full h-full flex items-center gap-2">
              <Sparkles className="h-7 w-10" />
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
