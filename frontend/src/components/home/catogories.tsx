import Link from "next/link";
import Image from "next/image";
import { CATEGORY_ARR } from "@/lib/constants";

export default function Categories() {
  return (
    <div
      className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center    "
      id="categories-section"
    >
      <div className="h-full max-w-[1370px] md:w-[90%] w-[100%]    ">
        <div className="h-full w-full flex flex-col justify-center items-center lg:pb-10  pb-5  ">
          <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            Choose Your <span className="text-[#00611F]">Plant</span> Family
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
            Select from handpicked categories that suit your style and needs
          </p>
        </div>

        <div className="flex gap-8 flex-wrap justify-center  ">
          {CATEGORY_ARR.map((cat) => (
            <Link key={cat.value} href={`/categories/${cat.value}`}>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="relative lg:w-[160px] lg:h-[160px] w-[150px] h-[150px] rounded-full overflow-hidden group">
                  <Image
                    src={cat.picture}
                    alt={cat.label}
                    fill
                    className="object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
                </div>

                <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:pt-5 pt-3">
                  {cat.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
