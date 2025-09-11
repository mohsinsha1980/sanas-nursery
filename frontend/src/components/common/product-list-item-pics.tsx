"use client";
import Image from "next/image";

import { useAutoplay } from "@/lib/hooks/SliderAutoPlay";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./SliderDotButtons";

export default function ProductListItemPics({ pics }: { pics: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: false, delay: 1000 }),
  ]);
  const { toggleAutoplay } = useAutoplay(emblaApi);
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  console.log("pics", pics);

  const onHover = () => {
    if (pics.length > 1) {
      return toggleAutoplay();
    }
  };

  return (
    <>
      <div
        className="bl__slider"
        ref={emblaRef}
        onMouseOver={() => onHover()}
        onMouseOut={() => onHover()}
      >
        <div className="bl__slider__container">
          {pics.map((item, index) => (
            <div className="bl__slider__slide" key={item + index}>
              <Image
                src={item}
                width={260}
                height={325}
                alt=""
                className="rounded-lg lg:w-full lg:h-full"
              />
            </div>
          ))}
        </div>
        {pics.length > 1 ? (
          <div className="bl__slider__dots">
            {pics.map((_, index) => (
              <DotButton
                key={`thumb_${index}`}
                onClick={() => onDotButtonClick(index)}
                className={"slider__dot".concat(
                  index === selectedIndex ? " selected" : ""
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
