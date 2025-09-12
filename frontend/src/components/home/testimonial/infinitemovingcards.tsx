"use client";

import { Testimonial } from "@/lib/types/public-types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  // Only show carousel if there are 3 or more testimonials
  const shouldShowCarousel = testimonials.length >= 3;

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    swipeToSlide: true,
    touchMove: true,
    accessibility: true,
  };

  const duplicatedItems = [...testimonials, ...testimonials, ...testimonials];

  // If less than 3 testimonials, show a simple grid layout
  if (!shouldShowCarousel) {
    return (
      <div className="container flex flex-wrap justify-center gap-6 py-4">
        {testimonials.map((item, idx) => (
          <div key={item._id + idx} className="w-full max-w-md">
            <TestimonialCard item={item} isMobile={true} />
          </div>
        ))}
      </div>
    );
  }

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
              <TestimonialCard item={item} key={index} isMobile={false} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Slider {...sliderSettings} ref={sliderRef}>
            {testimonials.map((item, idx) => (
              <TestimonialCard
                key={item._id + idx}
                item={item}
                isMobile={true}
              />
            ))}
          </Slider>

          <div className="w-[80%] mx-auto flex justify-between gap-6 mt-10 ">
            <button
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.slickPrev();
                }
              }}
              className="p-3 bg-[#4CB390] rounded-full text-white hover:bg-[#3a8c6e] transition active:scale-95 touch-manipulation"
              type="button"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.slickNext();
                }
              }}
              className="p-3 bg-[#4CB390] rounded-full text-white hover:bg-[#3a8c6e] transition active:scale-95 touch-manipulation"
              type="button"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
