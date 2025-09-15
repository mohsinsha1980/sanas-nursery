import BuyNowBtn from "@/components/categories/buy-now-btn";
import PlantDescTabs from "@/components/categories/plant-desc-tabs";
import ProductPictureSlider from "@/components/common/product-picture-slider";
import DetailsLoading from "@/components/layout/DetailsLoader";
import { getPlantDetailsByID } from "@/lib/api-routes/api-public";
import { getPicURL } from "@/lib/helper";
import { PlantDataType } from "@/lib/types/common-types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function fetchProductDetails(plantID: string): Promise<{
  data: {
    plant: PlantDataType;
    similarPlants: PlantDataType[];
  };
}> {
  const controller = new AbortController();
  const response = await getPlantDetailsByID(plantID, controller);
  const plantData = await response.json();
  return plantData;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plant_id: string }>;
}): Promise<Metadata> {
  const paramsData = await params;
  const plantID = paramsData.plant_id;
  const response = await fetchProductDetails(plantID);

  if (!response.data) {
    return {
      title: "Not found",
      description: "The page you are looking for is not found",
    };
  }

  const title = response.data.plant.title;
  const description = response.data.plant.metaDescription;

  return {
    title: title,
    description: description,
  };
}

export default async function ProductDetailsPageByID({
  params,
}: {
  params: Promise<{
    plant_id: string;
  }>;
}) {
  const plantID = (await params).plant_id;

  const response: {
    data: {
      plant: PlantDataType;
      similarPlants: PlantDataType[];
    };
  } = await fetchProductDetails(plantID);

  console.log("response ", response);

  if (!response.data.plant) {
    return notFound();
  }

  const plant = response.data.plant;
  const similarPlants = response.data.similarPlants;
  const pictures = plant.pictures.map((item: string) => getPicURL(item));

  return (
    <Suspense fallback={<DetailsLoading />}>
      <section className="bg-white py-10 lg:mt-30 mt-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-5  ">
          <div className="">
            <ProductPictureSlider pictures={pictures} />
          </div>

          <div className="space-y-5 flex flex-col lg:justify-start justify-between items-start ">
            <div>
              <h1 className="lg:text-[40px] text-[30px] font-bold text-[#0D6536] lg:text-start text-center">
                {plant.title}
              </h1>
            </div>

            {plant.summary && (
              <p className="text-[18px] font-medium leading-relaxed text-start ">
                {plant.summary}
              </p>
            )}

            {plant.details && (
              <div
                className="leading-relaxed text-start "
                dangerouslySetInnerHTML={{ __html: plant.details }}
              />
            )}

            {plant.specifications?.length > 0 && (
              <div className="">
                <table className="w-full border-separate border-spacing-y-2">
                  <tbody>
                    {plant.specifications.map((spec, index) => (
                      <tr key={spec.label + index} className="">
                        <td className="relative text-[18px] py-2 px-3 font-medium text-gray-800">
                          {spec.label}
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[30%] w-px bg-gray-600"></span>
                        </td>

                        <td className="text-[18px] py-2 px-3 font-medium text-gray-800">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <BuyNowBtn plant={plant} />
          </div>
        </div>
      </section>

      <section className="lg:max-w-[1400px] mx-auto  lg:mb-30 md:mb-20 mb-10">
        <PlantDescTabs plant={plant} />
      </section>

      {similarPlants.length > 0 && (
        <section className="lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 bg-orange-50 ">
          <div className="container mx-auto px-4 ">
            <h2 className="lg:text-[38px] text-[28px] font-semibold text-center mb-10 ">
              Similar <span className="text-[#00611F]">Plant</span> You Might
              Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between items-center gap-6 ">
              {similarPlants.map((sp) => (
                <Link
                  key={sp._id}
                  href={`/categories/${sp.category}/${sp.slug}/${sp._id}`}
                >
                  <div className="relative cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden group  ">
                    {/* Image */}
                    <div className="relative lg:w-[90%] w-[65%] lg:h-[400px] h-[300px] mx-auto ">
                      <Image
                        src={getPicURL(sp.pictures[0])}
                        alt={sp.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Title */}
                    <p className="text-[#505050] text-lg font-semibold mt-3 mb-4 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
                      {sp.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Suspense>
  );
}
