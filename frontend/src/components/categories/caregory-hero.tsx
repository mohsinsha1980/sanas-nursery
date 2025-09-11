import { CATEGORY_ARR } from "@/lib/constants";
import Image from "next/image";

const CategoryHero = ({ categoryValue }: { categoryValue: string }) => {
  const category = CATEGORY_ARR.find((cat) => cat.value === categoryValue);
  return (
    <div key="hero">
      <div className="relative w-full lg:h-[500px] h-screen">
        <div className="z-10 absolute lg:w-[800px] w-full h-fit lg:top-[35%] top-[50%] -translte-y-1/2 lg:left-[5%] ">
          <h1 className="text-[#354733] lg:text-[48px] md:text-[50px] text-[40px] font-bold lg:leading-15 leading-13 md:text-start text-center">
            {category?.title as string}
          </h1>
          <p className="text-[#505050] lg:text-[22px] md:text-[20px] text-[20px] font-semibold md:text-start text-center lg:mt-5">
            {category?.description as string}
          </p>
        </div>
        <Image
          src={category?.heroImage as string}
          alt=""
          fill
          className="lg:h-full lg:w-full object-cover"
        />
      </div>
    </div>
  );
};

export default CategoryHero;
