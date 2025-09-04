import { PlantsCardType } from "@/lib/types/common-types";
import Link from "next/link";
import ProductListItemPics from "../common/product-list-item-pics";

const PlantCard = ({ data }: { data: PlantsCardType }) => {
  return (
    <Link
      key={data.id}
      href={`/categories/${data.category}/${data.slug}/${data.id}`}
    >
      <div className=" rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden group">
        <ProductListItemPics pics={data.pictures} />
        <p className="text-[#505050] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mt-2 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
          {data.title}
        </p>
      </div>
    </Link>
  );
};

export default PlantCard;
