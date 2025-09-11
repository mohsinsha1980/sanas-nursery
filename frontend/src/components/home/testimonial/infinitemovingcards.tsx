"use client";

import { Testimonial } from "@/lib/types/public-types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings as SlickSettings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TestimonialCard from "./testimonial-card";

export default function InfiniteOrSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [start] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (scrollerRef.current) {
      if (!isLargeScreen) {
        const totalHeight = Array.from(scrollerRef.current.children).reduce(
          (acc, child) => acc + (child as HTMLElement).offsetHeight + 32,
          0
        );
        scrollerRef.current.style.height = `${totalHeight}px`;
      } else {
        scrollerRef.current.style.height = "auto";
      }
    }
  }, [isLargeScreen, testimonials, start]);

  const sliderSettings: SlickSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const duplicatedItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      {isLargeScreen ? (
        <div
          ref={containerRef}
          className={cn(
            "scroller relative z-20 w-full overflow-hidden group",
            "speed-normal direction-left"
          )}
        >
          <div
            ref={scrollerRef}
            className="flex w-max min-w-full shrink-0 flex-nowrap lg:gap-6 gap-4 py-4 animate-scroll group-hover:[animation-play-state:paused]"
          >
            {duplicatedItems.map((item, index) => (
              <TestimonialCard item={item} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Slider {...sliderSettings} ref={sliderRef}>
            {testimonials.map((item, idx) => (
              <div key={item._id + idx} className="px-4">
                <div className="rounded-lg bg-[#4CB390] px-6 py-8 text-white">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                      <Quote size={24} className="text-white" />
                      <span className="font-bold text-[18px]">
                        {item.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-white" />
                      <span className="font-bold text-[18px]">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-[16px] leading-relaxed">{item.content}</p>
                  <div>
                    <Link
                      href={item.link || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-white underline lg:text-[20px] md:text-[18px] text-[16px] mt-4 md:mt-5"
                    >
                      Website Link
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="w-[80%] mx-auto flex justify-between gap-6 mt-10 ">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-3 bg-[#4CB390] rounded-full text-white hover:bg-[#3a8c6e] transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="p-3 bg-[#4CB390] rounded-full text-white hover:bg-[#3a8c6e] transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
