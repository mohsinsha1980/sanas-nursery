import BuyNowBtn from "@/components/categories/buy-now-btn";
import PlantDescTabs from "@/components/categories/plant-desc-tabs";
import ProductPictureSlider from "@/components/common/product-picture-slider";
import DetailsLoading from "@/components/layout/DetailsLoader";
import { getPlantDetailsByID } from "@/lib/api-routes/api-public";
import { CATEGORIES } from "@/lib/constants";
import { getPicURL } from "@/lib/helper";
import { PlantDataType } from "@/lib/types/common-types";
import { ChevronRight } from "lucide-react";
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

  if (!response?.data?.plant?._id) {
    return notFound();
  }

  const plant = response.data.plant;
  const similarPlants = response.data.similarPlants;
  const pictures = plant.pictures.map((item: string) => getPicURL(item));

  const category = Object.values(CATEGORIES).find(
    (cat) => cat.value === plant.category
  )!;

  return (
    <Suspense fallback={<DetailsLoading />}>
      <section className="bg-white py-10 lg:mt-15 mt-10 lg:px-0 px-4">
        <div className="lg:max-w-[1200px] mx-auto w-full h-full flex flex-col justify-between items-start lg:pb-3 lg:pt-0 pt-2 pb-5">
          <h2 className="text-[#0D6536] text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-medium text-start">
            {category.label}
          </h2>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 lg:pt-1">
            <Link
              href="/"
              className="text-[18px] text-[#505050] font-semibold text-start hover:text-[#f37521]"
            >
              Home
            </Link>
            <ChevronRight className="text-[#505050] flex-shrink-0" />
            {category && (
              <>
                <Link href={`/categories/${category.value}`}>
                  <p className="text-[18px] font-semibold text-[#505050]  hover:text-[#f37521]">
                    {category.label}
                  </p>
                </Link>
                <ChevronRight className="text-[#505050] flex-shrink-0" />
              </>
            )}

            <p className="text-[19px] font-semibold text-[#f37521]  break-words">
              {plant.title}
            </p>
          </div>
        </div>

        <div className="lg:max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-5  ">
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

      <section className="lg:max-w-[1200px] mx-auto  mb-10">
        <PlantDescTabs plant={plant} />
      </section>

      {similarPlants.length > 0 && (
        <section className="pb-10 ">
          <div className="lg:max-w-[1200px] mx-auto px-4 ">
            <h2 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center mb-10 ">
              Similar <span className="text-[#00611F]">Plant</span> You Might
              Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between items-center gap-4 md:gap-6">
              {similarPlants.map((sp) => (
                <Link
                  key={sp._id}
                  href={`/categories/${sp.category}/${sp.slug}/${sp._id}`}
                >
                  <div className="relative cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden group">
                    <div className="relative w-full h-[250px] sm:h-[280px] md:h-[320px] lg:h-[400px] mx-auto">
                      <Image
                        src={getPicURL(sp.pictures[0])}
                        alt={sp.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Title */}
                    <p className="text-[#505050] text-sm sm:text-base md:text-lg font-semibold mt-3 mb-4 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
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
