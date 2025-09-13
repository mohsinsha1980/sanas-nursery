import { Testimonial } from "@/lib/types/public-types";
import { Quote, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const TestimonialCard = ({
  item,
  isMobile = false,
}: {
  item: Testimonial;
  isMobile?: boolean;
}) => {
  // Unified design for both mobile and desktop
  return (
    <div
      className={`px-4 ${
        isMobile ? "h-full" : "lg:w-[600px] w-[400px] shrink-0"
      }`}
    >
      <div
        key={item._id}
        className="relative rounded-lg bg-[#4CBA9B] lg:px-8 md:px-6 px-5 lg:py-14 md:py-10 py-6 text-white flex flex-col h-full min-h-[300px]"
      >
        {/* Decorative quote icon at top */}
        <div className="absolute top-4 right-4 opacity-20">
          <Quote size={40} className="text-white" />
        </div>

        {/* Header with author and rating */}
        <div className="flex justify-between items-start lg:mb-8 md:mb-6 mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Quote size={20} className="text-white" />
            </div>
            <div>
              <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px] block">
                {item.author}
              </span>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(item.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-white/80">
                  {item.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content area with proper spacing */}
        <div className="flex-1 flex flex-col">
          <p className="lg:text-[20px] md:text-[18px] text-[16px] leading-relaxed mb-4 break-words flex-1">
            {item.content}
          </p>

          {/* Website link */}
          {item.link && (
            <div className="relative z-10 mt-4">
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white lg:text-[18px] md:text-[16px] text-[14px] font-medium transition-all duration-200 hover:underline"
              >
                <span>Visit Website</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hover:rotate-45 transition-transform duration-200"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
