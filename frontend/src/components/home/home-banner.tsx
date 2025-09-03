import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomeBanner() {
  return (
    <section>
      <div className="relative w-full h-screen ">
        <Image
          src="/home-hero.webp"
          alt=""
          width={1920}
          height={1013}
          className="h-full w-full object-cover"
        />
        <div
          className="z-1 absolute 
        lg:max-w-[611px] lg:h-[385px] lg:top-[58%] lg:left-[28%] lg:space-y-4
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center
        "
        >
          <p className="text-[#F37521] lg:text-[20px] md:text-[20px] text-[20px] font-medium ">
            Love for Nature
          </p>
          <h1 className="text-[#354733] lg:text-[64px] md:text-[50px] text-[40px] font-bold lg:leading-18 leading-13 md:text-start text-center">
            Where Every Leaf Tells a Story
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[20px] font-medium md:text-start text-center">
            From lush indoor greens to vibrant flowering plants, our curated
            collection is designed to brighten your space, purify your air, and
            bring the calming touch of nature into your everyday life.
          </p>
          <Button variant="orange" size="lg" className="">
            View Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
