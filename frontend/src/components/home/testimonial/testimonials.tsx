import React from "react";
import InfiniteMovingCardsDemo from "./infinitemovingcards";
import { Testimonial } from "@/lib/types/public-types";

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <>
      <div className="h-full w-full lg:pt-27 lg:pb-27 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0]">
        <div className=" h-fit w-full   ">
          <div className="text-center mb-10">
            <h1 className="text-[#00611F] lg:text-[42px] text-[28px] font-semibold">
              Why <span className="text-black">Customers</span> Trust Us
            </h1>
            <p className="text-[#505050] lg:text-[20px] text-[16px] font-semibold">
              A glimpse of our plants thriving in homes, gardens, and happy
              spaces.
            </p>
          </div>
          <div className="w-[100%]   ">
            <InfiniteMovingCardsDemo testimonials={testimonials} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
