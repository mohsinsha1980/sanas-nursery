"use client";

import { defultHomeData } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";
import { HomeGalleryType } from "@/lib/types/common-types";
import ImageCard from "./gallery-image-card";

export default function GallerySection({
  images,
}: {
  images: HomeGalleryType | undefined;
}) {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="max-w-[900px] flex flex-col items-center justify-center pt-10 ">
        <div className="text-center lg:mb-12 md:mb-10 mb-5 ">
          <p className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            <span className="text-[rgba(0,97,31,1)]">Green</span> Moments
            Gallery
          </p>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:text-start text-center">
            A glimpse of our plants thriving in homes, gardens, and happy
            spaces.
          </p>
        </div>

        <div className="w-full max-w-[900px] flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_800px] gap-8 max-w-[900px] w-full">
            <div className="h-[400px] lg:h-auto">
              <ImageCard
                src={
                  images?.G1 ? getPicURL(images?.G1) : defultHomeData.Gallery.G2
                }
                alt="Gallery Big"
                field="G1"
                width={500}
                height={793}
              />
            </div>

            <div className="flex flex-col gap-4 lg:w-[55%] w-full">
              <div className="h-[200px] lg:h-auto">
                <ImageCard
                  src={
                    images?.G2
                      ? getPicURL(images?.G2)
                      : defultHomeData.Gallery.G2
                  }
                  alt="Gallery Small 1"
                  field="G2"
                  width={828}
                  height={389}
                />
              </div>
              <div className="h-[200px] lg:h-auto">
                <ImageCard
                  src={
                    images?.G3
                      ? getPicURL(images?.G3)
                      : defultHomeData.Gallery.G3
                  }
                  alt="Gallery Small 2"
                  field="G3"
                  width={828}
                  height={389}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
