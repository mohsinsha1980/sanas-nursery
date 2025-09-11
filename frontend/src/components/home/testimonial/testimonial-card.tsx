import { Testimonial } from "@/lib/types/public-types";
import { Quote, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div
      key={item._id}
      className="relative lg:w-[600px] w-[400px] shrink-0 rounded-lg bg-[#4CB390] lg:px-8 md:px-6 px-5 lg:py-14 md:py-10 py-6 text-white flex flex-col justify-between"
    >
      <div className="flex justify-between items-center lg:mb-8 md:mb-5 mb-5">
        <div className="flex items-center gap-2">
          <Quote size={28} className="text-white rotate-180" />
          <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px]">
            {item.author}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={18} className="" />
          <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px]">
            {item.rating}
          </span>
        </div>
      </div>

      <p className="lg:text-[20px] md:text-[18px] text-[16px] leading-relaxed mb-4">
        {item.content}
      </p>

      <div>
        <Link
          href={item.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white underline lg:text-[20px] md:text-[18px] text-[16px]"
        >
          Website Link
        </Link>
      </div>
    </div>
  );
};

export default TestimonialCard;
