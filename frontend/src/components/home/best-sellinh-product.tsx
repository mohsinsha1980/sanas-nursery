import { getPicURL } from "@/lib/helper";
import { BestSellingPlant } from "@/lib/types/public-types";
import Image from "next/image";
import Link from "next/link";

const BestSellProdCards = ({ plants }: { plants: BestSellingPlant[] }) => {
  return (
    <div className="h-full w-full lg:pt-25 lg:pb-20 md:pt-20 md:pb-20 pt-10 pb-10 flex justify-center bg-[#E4FFF0]">
      <div className="lg:max-w-[1100px] w-[95%]">
        <div className="text-center mb-10">
          <h1 className="text-[#00611F] lg:text-[42px] text-[28px] font-semibold">
            Best Selling <span className="text-black">Plants</span>
          </h1>
          <p className="text-[#505050] lg:text-[20px] text-[16px] font-semibold">
            Find what you are looking for
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full flex items-center justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
            {plants.map((item, i) => (
              <div key={i} className="flex-shrink-0">
                <Link
                  href={`/categories/${item.category}/${item.slug}/${item._id}`}
                >
                  <Image
                    src={getPicURL(item.pictures[0])}
                    alt={item.title}
                    width={330}
                    height={500}
                    className="rounded-lg object-cover w-[280px] h-[400px] md:w-[300px] md:h-[450px] lg:w-[330px] lg:h-[500px]"
                  />
                </Link>
                <p className="text-[#505050] text-[20px] font-semibold mt-2 text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellProdCards;
