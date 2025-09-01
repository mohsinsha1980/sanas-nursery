"use client";

import React, { useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Star, Quote } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur. Vel quam amet gravida senectus arcu elit sollicitudin. Laoreet sed malesuada elementum amet purus aliquam dignissim cursus.",
    name: "Vaibbav Bokare",
    rating: 4.5,
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur. Vel quam amet gravida senectus arcu elit sollicitudin. Laoreet sed malesuada elementum amet purus aliquam dignissim cursus.",
    name: "Vaibbav Bokare",
    rating: 4.5,
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur. Vel quam amet gravida senectus arcu elit sollicitudin. Laoreet sed malesuada elementum amet purus aliquam dignissim cursus.",
    name: "Vaibbav Bokare",
    rating: 4.5,
  },
];

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="w-full relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    rating: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  addAnimation();

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    if (!containerRef.current) return;
    if (speed === "fast") {
      containerRef.current.style.setProperty("--animation-duration", "20s");
    } else if (speed === "normal") {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    } else {
      containerRef.current.style.setProperty("--animation-duration", "80s");
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap lg:gap-6 gap-4 py-4 ",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative lg:w-[600px] w-[400px] shrink-0 rounded-lg bg-[#4CB390] lg:px-8 md:px-6 px-5 lg:py-14 md:py-10 py-6 text-white"
          >
            <div className="flex justify-between items-center lg:mb-8 md:mb-5 mb-5">
              <div className="flex items-center gap-2">
                <Quote size={28} className="text-white" />
                <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px]">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={18} className="text-white" />
                <span className="lg:font-bold lg:text-[24px] md:text-[20px] text-[18px]">
                  {item.rating}
                </span>
              </div>
            </div>
            <p className="lg:text-[20px] md:text-[18px]  text-[16px] leading-relaxed">
              {item.quote}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
