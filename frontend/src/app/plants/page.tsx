import AllPlantsHero from "@/components/categories/all-plants-hero";
import CategoryFilter from "@/components/categories/category-filter";
import PlantCard from "@/components/categories/plant-card";
import { ServerPagination } from "@/components/common/server-pagination";
import Loading from "@/components/layout/Loading";
import { getAllPlants } from "@/lib/api-routes/api-public";
import { PLANTS_PER_PAGE } from "@/lib/constants";
import { getPlantsCardData } from "@/lib/helper";
import {
  CategoryPlantsHttpResDataType,
  PlantDataType,
  PlantFilterType,
  PlantsCardType,
} from "@/lib/types/common-types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function fetchAllPlants(
  searchParamsData?: PlantFilterType
): Promise<CategoryPlantsHttpResDataType> {
  const response = await getAllPlants(searchParamsData);
  const plantsData = await response.json();
  return plantsData;
}

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<PlantFilterType>;
}) {
  const searchParamsData = await searchParams;
  const currentPage = Number(searchParamsData.page) ?? "1";

  const plantsResponse = await fetchAllPlants(searchParamsData);

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
      <div className="relative flex flex-col justify-between items-center  ">
        <div className="w-full lg:h-[500px] h-fit ">
          <AllPlantsHero />
        </div>

        <div className="lg:max-w-[1200px] w-full h-full lg:pt-25 pt-10 lg:px-0 px-3 text-center flex flex-col justify-between items-start">
          <div className="flex justify-between items-center w-full lg:mb-2">
            <h2 className="text-[#0D6536] text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-medium text-start">
              Plants Collection
            </h2>
            <div className="md:hidden">
              <CategoryFilter category="all" />
            </div>
          </div>
          <div className="flex justify-between items-center h-fit w-fit gap-x-2 ">
            <Link
              href={"/"}
              className="text-[18px] text-[#505050] font-semibold text-start hover:text-[#f37521]"
            >
              Home
            </Link>
            <ChevronRight className="text-[#505050] " />
            <p className="text-[18px] font-semibold text-[#f37521]">Plants</p>
          </div>
        </div>

        <div
          key="plant-list-main-div"
          className="h-full lg:max-w-[1200px] w-full pt-10 pb-15 flex flex-col justify-center items-center   lg:px-0 px-3  "
        >
          <div key="filter-list-sort" className="relative  w-full h-full     ">
            <div
              key="filter-and-list"
              className="h-full w-full flex lg:flex-row flex-col justify-between gap-y-10   "
            >
              <div className="hidden md:block">
                <CategoryFilter category="all" />
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
                    <div className="col-span-2 lg:col-span-4 flex flex-col items-center justify-center py-16 px-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                        No Plants Found
                      </h3>
                      <p className="text-gray-600 text-center max-w-md mb-6">
                        We couldn&apos;t find any plants at the moment. Try
                        adjusting your filters or check back later for new
                        additions.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href="/"
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-center"
                        >
                          Go to Home
                        </Link>
                      </div>
                    </div>
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
