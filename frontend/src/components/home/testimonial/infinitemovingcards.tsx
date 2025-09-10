"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Slider, { Settings as SlickSettings } from "react-slick";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

interface Item {
  quote: string;
  name: string;
  rating: string;
  website: string;
}

export default function InfiniteOrSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  const items: Item[] = useMemo(
    () => [
      {
        name: "John Doe",
        quote: "This service exceeded my expectations. Highly recommended!",
        rating: "5",
        website: "https://lucide.dev/icons/quote",
      },
      {
        name: "Jane Smith",
        quote: "Amazing experience! Will definitely come back again.",
        rating: "4.8",
        website: "https://lucide.dev/icons/quote",
      },
      {
        name: "Alice Johnson",
        quote: "Friendly staff and great support throughout the process.",
        rating: "4.9",
        website: "https://lucide.dev/icons/quote",
      },
      {
        name: "Bob Williams",
        quote: "Very satisfied with the quality and attention to detail.",
        rating: "5",
        website: "https://lucide.dev/icons/quote",
      },
      {
        name: "Emily Brown",
        quote: "A seamless experience from start to finish. Loved it!",
        rating: "4.7",
        website: "https://lucide.dev/icons/quote",
      },
    ],
    []
  );

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  // Adjust scroller height for small screens
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
  }, [isLargeScreen, items, start]);

  // Slider settings
  const sliderSettings: SlickSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const duplicatedItems = [...items, ...items, ...items];

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
            {duplicatedItems.map((item, idx) => (
              <div
                key={idx}
                className="relative lg:w-[600px] w-[400px] shrink-0 rounded-lg bg-[#4CB390] lg:px-8 md:px-6 px-5 lg:py-14 md:py-10 py-6 text-white flex flex-col justify-between"
              >
                {/* Top Section: Name & Rating */}
                <div className="flex justify-between items-center lg:mb-8 md:mb-5 mb-5">
                  <div className="flex items-center gap-2">
                    <Quote size={28} className="text-white rotate-180" />
                    <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px]">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={18} className="" />
                    <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px]">
                      {item.rating}
                    </span>
                  </div>
                </div>

                {/* Quote Section */}
                <p className="lg:text-[20px] md:text-[18px] text-[16px] leading-relaxed mb-4">
                  {item.quote}
                </p>

                <div>
                  <Link
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white underline lg:text-[20px] md:text-[18px] text-[16px]"
                  >
                    Website Link
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Slider {...sliderSettings} ref={sliderRef}>
            {items.map((item, idx) => (
              <div key={idx} className="px-4">
                <div className="rounded-lg bg-[#4CB390] px-6 py-8 text-white">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                      <Quote size={24} className="text-white" />
                      <span className="font-bold text-[18px]">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-white" />
                      <span className="font-bold text-[18px]">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-[16px] leading-relaxed">{item.quote}</p>
                  <div>
                    <Link
                      href={item.website}
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
