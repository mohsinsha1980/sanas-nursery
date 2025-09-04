import CategoryHero from "@/components/categories/caregory-hero";
import CategoryFilter from "@/components/categories/category-filter";
import Categories from "@/components/categories/catogories";
import PlantCard from "@/components/categories/plant-card";
import { ServerPagination } from "@/components/common/server-pagination";
import Loading from "@/components/layout/Loading";
import config from "@/config/env-config";
import { getCategoryPlants } from "@/lib/api-routes/api-public";
import { CATEGORIES, PLANTS_PER_PAGE } from "@/lib/constants";
import { getPlantsCardData } from "@/lib/helper";
import {
  CategoryPageParamsProps,
  CategoryPlantsHttpResDataType,
  PlantDataType,
  PlantFilterType,
  PlantsCardType,
} from "@/lib/types/common-types";
import { Metadata } from "next";
import { Suspense } from "react";

<<<<<<< HEAD
const plants = {
  "fruit-trees": Array.from({ length: 32 }, (_, i) => ({
    id: `fruit${i + 1}`,
    name: `Fruit Plant ${i + 1}`,
    image: `/plant${(i % 3) + 1}.png`,
  })),
  "flower-trees": Array.from({ length: 32 }, (_, i) => ({
    id: `flower${i + 1}`,
    name: `Flower Plant ${i + 1}`,
    image: `/images/flower${(i % 5) + 1}.png`,
  })),
};
=======
export async function generateMetadata({
  params,
}: CategoryPageParamsProps): Promise<Metadata> {
  const paramsData = await params;
  const category = paramsData.category;
>>>>>>> d51c2f7cd147a0c0dcd020f018f9b337288a3d50

  const categoryKey = Object.keys(CATEGORIES).find(
    (key) => CATEGORIES[key as keyof typeof CATEGORIES].value === category
  );

  if (categoryKey) {
    const categoryData = CATEGORIES[categoryKey as keyof typeof CATEGORIES];
    return {
      title: `${categoryData.seoTitle} | ${config.WEBAPP_TITLE}`,
      description: categoryData.seoDescription,
      openGraph: {
        title: ` ${categoryData.seoTitle} | ${config.WEBAPP_TITLE}`,
        description: categoryData.description,
        url: `${config.WEBAPP_URL}/categories/${categoryData.value}`,
      },
    };
  }

  return {
    title: "Not found",
    description: "The page you are looking for is not found",
  };
}

async function fetchPlants(
  slug: string,
  searchParamsData?: PlantFilterType
): Promise<CategoryPlantsHttpResDataType> {
  const response = await getCategoryPlants(slug, searchParamsData);
  const catProdData = await response.json();
  return catProdData;
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<PlantFilterType>;
}) {
  const category = (await params).category;
  const searchParamsData = await searchParams;
  const currentPage = Number(searchParamsData.page) ?? "1";

  const plantsResponse = await fetchPlants(category, searchParamsData);

  let plants: PlantDataType[] = [];
  let total = 0;
  if (plantsResponse?.data) {
    plants = plantsResponse.data.plants;
    total = plantsResponse.data.total;
  }

  let updatedPlants: PlantsCardType[] = [];
  if (plants && plants.length) {
    updatedPlants = plants.map((item) => getPlantsCardData(item));
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="pt-40">
        <CategoryHero categoryValue={category} />
        <div>
          <Categories category={category} />
        </div>

        <div
          key="plant-list-main-div"
          className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-col justify-center items-center"
        >
          <div key="filter-list-sort" className="relative  w-[70%] h-full ">
            <div
              key="filter-and-list"
              className="h-full w-full flex justify-between "
            >
<<<<<<< HEAD
              <div className="grid grid-cols-4 gap-6">
                {currentItems.length > 0 ? (
                  currentItems.map((plant) => (
                    <Link
                      key={plant.id}
                      href={`/categories/${category}/${plant.id}`}
                    >
                      <div className="w-[250px] h-[417px] rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden group">
                        {/* Image Wrapper */}
                        <div className="relative w-[90%] h-[90%] overflow-hidden rounded-lg">
                          {/* Plant Image */}
                          <Image
                            src={plant.image}
                            alt={plant.name}
                            height={50}
                            width={50}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                          />

                          {/* Overlay (appears on hover) */}
                          <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
                        </div>

                        {/* Plant Name */}
                        <p className="text-[#505050] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mt-2 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
                          {plant.name}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No plants found in this category.</p>
                )}
              </div>
              <div key="pagination">
                <div className="flex justify-center mt-6 space-x-10   ">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-[50px] h-[50px] rounded-xl ${
                        currentPage === i + 1
                          ? "bg-[#F37521] text-white text-xl"
                          : "bg-[#FFD7BC] text-black text-xl"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
=======
              <CategoryFilter />
              <div
                key="list-div"
                className="w-[82%] h-[100%] flex flex-col justify-center "
              >
                <div className="grid grid-cols-4 gap-6">
                  {updatedPlants.length > 0 ? (
                    updatedPlants.map((plant) => (
                      <PlantCard key={plant.id} data={plant} />
                    ))
                  ) : (
                    <p>No plants found in this category.</p>
                  )}
>>>>>>> d51c2f7cd147a0c0dcd020f018f9b337288a3d50
                </div>
                {updatedPlants.length &&
                total &&
                Math.ceil(total / PLANTS_PER_PAGE) > 1 ? (
                  <ServerPagination
                    total={total}
                    perPage={PLANTS_PER_PAGE}
                    currentPage={currentPage}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
