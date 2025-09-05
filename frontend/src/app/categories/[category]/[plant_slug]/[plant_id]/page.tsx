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
      <section className="bg-white border-b py-6 mt-40">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">{plant.title}</h1>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <ProductPictureSlider pictures={pictures} />
          </div>

          <div className="space-y-6">
            {plant.summary && (
              <p className="text-gray-700 text-lg leading-relaxed">
                {plant.summary}
              </p>
            )}

            {plant.specifications?.length > 0 && (
              <div className="bg-gray-50 border rounded-xl p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Key Specifications
                </h2>
                {plant.specifications.map((spec, index) => (
                  <p key={spec.label + index} className="text-gray-600">
                    <span className="font-medium">{spec.label}:</span>{" "}
                    <span>{spec.value}</span>
                  </p>
                ))}
              </div>
            )}

            {plant.details && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: plant.details }}
              />
            )}

            <BuyNowBtn plant={plant} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-10">
        <PlantDescTabs plant={plant} />
      </section>

      {similarPlants.length > 0 && (
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Similar Plants You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarPlants.map((sp) => (
                <Link
                  key={sp._id}
                  href={`/categories/${sp.category}/${sp.slug}/${sp._id}`}
                >
                  <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div className="relative w-full h-64">
                      <Image
                        src={getPicURL(sp.pictures[0])}
                        alt={sp.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-gray-800 font-medium text-lg group-hover:text-[#DA5700] transition-colors">
                        {sp.title}
                      </p>
                    </div>
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
