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

export async function generateMetadata({
  params,
}: CategoryPageParamsProps): Promise<Metadata> {
  const paramsData = await params;
  const category = paramsData.category;

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
