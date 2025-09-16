import CategoryHero from "@/components/categories/caregory-hero";
import CategoryFilter from "@/components/categories/category-filter";
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
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight  } from "lucide-react";

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

  const categoryData = Object.values(CATEGORIES).find(
    (cat) => cat.value === category
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex flex-col justify-between items-center  ">
        <div className="w-full lg:h-[500px] h-fit ">
          <CategoryHero categoryValue={category} />
        </div>

        <div className="lg:max-w-[1250px] w-full h-full lg:pt-25 pt-10 lg:px-0 px-3 text-center flex flex-col justify-between items-start">
          <h2 className="text-[#0D6536] lg:text-[40px] md:text-[36px] text-[38px] font-bold text-start  ">
            {categoryData?.label || category}
          </h2>
          <div className="flex justify-between items-center h-fit w-fit gap-x-2 ">
            <Link
              href={"/"}
              className="text-[20px] text-[#505050] font-semibold text-start hover:text-[#f37521]"
            >
              Home
            </Link>
            <ChevronRight  className="text-[#505050] "/>
            <p className="text-[21px] font-semibold text-[#f37521] lg:pt-1">{category}</p>
          </div>
        </div>

        <div
          key="plant-list-main-div"
          className="h-full lg:max-w-[1250px] w-full pt-10 pb-15 flex flex-col justify-center items-center   lg:px-0 px-3  "
        >
          <div key="filter-list-sort" className="relative  w-full h-full     ">
            <div
              key="filter-and-list"
              className="h-full w-full flex lg:flex-row flex-col justify-between gap-y-10   "
            >
              <div className="">
                <CategoryFilter category={category} />
              </div>

              <div
                key="list-div"
                className="lg:w-[80%] w-full h-[100%] flex flex-col justify-center "
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
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
