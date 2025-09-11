import { Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

const BlogListHero = () => {
  return (
    <div className="relative">
      <Image
        src="/site/blogs/hero.jpg"
        height={1700}
        width={1700}
        alt=""
        className="h-screen w-full"
      />
      <div
        className="z-1 absolute 
        lg:w-[911px] lg:h-[300px] lg:top-[70%] lg:left-[40%] lg:space-y-7
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center  "
      >
        <h1 className="text-[#354733] lg:text-[64px] md:text-[50px] text-[40px] font-bold lg:leading-18 leading-13 md:text-start text-center">
          Our Blog
        </h1>
        <p className="text-[#505050] lg:text-[22px] md:text-[20px] text-[20px] font-semibold md:text-start text-center">
          Discover expert gardening tips, plant care guides, and nursery
          insights to help you grow a thriving garden.
        </p>
        <div className="flex items-center justify-between gap-15 text-[#505050] lg:text-[22px] md:text-[20px] text-[20px] font-medium ">
          <div className="w-full h-full flex items-center gap-2">
            <TrendingUp className="h-7 w-10" />
            <span className="text-md font-semibold">Expert Tips</span>
          </div>
          <div className="w-full h-full flex items-center gap-2">
            <Sparkles className="h-7 w-10" />
            <p className="text-md font-semibold whitespace-nowrap">
              Fresh Content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListHero;
