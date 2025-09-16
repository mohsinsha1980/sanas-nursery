"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DotButton, useDotButton } from "./SliderDotButtons";

export default function ProductPictureSlider({
  pictures,
}: {
  pictures: string[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Autoplay({
      playOnInit: true,
      delay: 4000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
    }),
    Fade(),
  ]);
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <div className="bl__product__slider sm:mt-2 flex lg:flex-row flex-col lg:justify-evenly justify-between ">
      <div className="bl__product__slider__container sm:!me-2  " ref={emblaRef}>
        <div className="bl__slider__container ">
          {pictures.length ? (
            pictures.map((item) => (
              <div className="bl__slider__slide" key={item}>
                <Image
                  src={item}
                  width={501}
                  height={668}
                  alt=""
                  className="rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>No pictures available</p>
          )}
        </div>
      </div>
      <div className="lg:bl__thumbnail__container w-full lg:pt-0 pt-5">
        {/* For lg and up → horizontal scroll */}
        <ScrollArea className="hidden lg:block w-full ">
          <div className="flex flex-col gap-8 pl-10">
            {pictures.length
              ? pictures.map((item, index) => (
                  <DotButton
                    key={`thumb_${index}`}
                    onClick={() => onDotButtonClick(index)}
                    className={"slider__dot".concat(
                      index === selectedIndex ? " selected" : ""
                    )}
                  >
                    <Image
                      src={item}
                      width={100}
                      height={125}
                      alt=""
                      className="rounded-lg"
                    />
                  </DotButton>
                ))
              : null}
          </div>
        </ScrollArea>

        {/* For small devices → grid 3 per row */}
        <div className="w-full grid grid-cols-3 gap-3 lg:hidden ">
          {pictures.length
            ? pictures.map((item, index) => (
                <DotButton
                  key={`grid_thumb_${index}`}
                  onClick={() => onDotButtonClick(index)}
                  className={"slider__dot".concat(
                    index === selectedIndex ? " selected" : ""
                  )}
                >
                  <Image
                    src={item}
                    width={100}
                    height={125}
                    alt=""
                    className="rounded-lg w-full h-auto"
                  />
                </DotButton>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
