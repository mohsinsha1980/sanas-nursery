import Link from "next/link";
import Image from "next/image";
import { CATEGORY_ARR } from "@/lib/constants";

export default function Categories({ category }: { category: string }) {
  return (
    <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center   border-2 border-violet-500">
      <div className="h-full max-w-[1370px] border-2 border-pink-500">
        <div className="flex gap-8 flex-wrap justify-center   border-2 border-black">
          {CATEGORY_ARR.map((cat) => {
            const isActive = category === cat.value;
            return (
              <Link key={cat.value} href={`/categories/${cat.value}`}>
                <div className="flex flex-col items-center cursor-pointer">
                  <div
                    className={`relative lg:w-[150px] lg:h-[150px] w-[120px] h-[120px] rounded-full overflow-hidden group
                      ${
                        isActive
                          ? "border-4 border-[#DA5700]"
                          : "border border-transparent"
                      }`}
                  >
                    <Image
                      src={cat.picture}
                      alt={cat.label}
                      fill
                      className="object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
                  </div>

                  <p
                    className={`lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:pt-5 pt-3
                      ${isActive ? "text-[#DA5700]" : "text-[#505050]"}`}
                  >
                    {cat.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
