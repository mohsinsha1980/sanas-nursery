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
    <div className="w-full max-w-[1920px] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold">
          <span className="text-[rgba(0,97,31,1)]">Green</span> Moments Gallery
        </h2>
      </div>

      <div className="w-full max-w-[1486px] flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[529px_828px] gap-8 max-w-[1374.53px] w-full">
          <ImageCard
            src={images?.G1 ? getPicURL(images?.G1) : defultHomeData.Gallery.G2}
            alt="Gallery Big"
            field="G1"
            width={529}
            height={793}
          />

          <div className="flex flex-col gap-8 lg:h-[793px]">
            <ImageCard
              src={
                images?.G2 ? getPicURL(images?.G2) : defultHomeData.Gallery.G2
              }
              alt="Gallery Small 1"
              field="G2"
              width={828}
              height={389}
            />
            <ImageCard
              src={
                images?.G3 ? getPicURL(images?.G3) : defultHomeData.Gallery.G3
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
  );
}
