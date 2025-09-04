import { PLANTS_PER_PAGE } from "@/lib/constants";

export default function ProductListLoading() {
  return (
    <div className="animate-pulse">
      <section>
        <div className="w-full h-[100px] p-0 bg-gray-300 mb-6"></div>
        <div className="p-6 container grid grid-cols-5 sm:grid-cols-2">
          <div className="sm:hidden">
            <div className="p-4 space-y-4 self-start bl_list pe-[20px] pb-[20px] border-b-2 border-black-500">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-6 w-28 bg-gray-300 rounded"></div>
            </div>
            <div className="p-4 flex justify-between items-center pe-[20px] pb-[20px] border-b-2 border-black-500">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-col gap-2 pe-[20px] pb-[20px] border-b-2 border-black-500">
              <div className="p-4 pb-0 flex justify-between items-center pe-[20px]">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="p-4 space-y-4 self-start bl_list">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-28 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pe-[20px] pb-[20px] border-b-2 border-black-500">
              <div className="p-4 pb-0 flex justify-between items-center pe-[20px]">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="p-4 space-y-4 self-start bl_list">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-28 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-2">
            <div className="grid grid-cols-4 sm:grid-cols-2">
              {[...Array(PLANTS_PER_PAGE)].map((_, index) => (
                <div
                  key={index}
                  className="space-y-4 p-4 rounded-lg shadow-sm m-4 mt-0 sm:p-0 sm:m-2"
                >
                  <div className="w-[260px] h-[325px] bg-gray-300 rounded sm:!w-auto sm:!h-[200px]"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
