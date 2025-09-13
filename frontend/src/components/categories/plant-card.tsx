"use client";

import { removeFromWishlist, saveToWishlist } from "@/lib/api-routes/api-user";
import { ROLES } from "@/lib/constants";
import { showSuccessToast } from "@/lib/helper";
import { PlantsCardType } from "@/lib/types/common-types";
import { RootState } from "@/redux/store";
import { addToWishlist, removeFromWishlistStore } from "@/redux/wishListSlice";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListItemPics from "../common/product-list-item-pics";

const PlantCard = ({ data }: { data: PlantsCardType }) => {
  const dispatch = useDispatch();
  const { wishlist, user } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const isInWishlist = wishlist?.items?.some((item) => item === data.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      if (isInWishlist) {
        if (user?.role === ROLES.USER) {
          await removeFromWishlist(data.id);
        }
        dispatch(removeFromWishlistStore(data.id));
        showSuccessToast("Removed from wishlist");
      } else {
        if (user?.role === ROLES.USER) {
          await saveToWishlist(data.id);
        }
        dispatch(addToWishlist(data.id));
        showSuccessToast("Added to wishlist");
      }
    } catch (_error: unknown) {
      console.log(_error);
      // do not show error as : if plant1 is saved in db for  logedin user and plan2 and plant3 was already saved in localstorage , all three will be shown like they are users wishlist , but if user click on plant2 or plant3 to remove from wishlist it backend will give error that no plant found in that speciic users wishlist , so here ignore that error only remove that from localstorage as it was only in localstorage od that specific device
      // when user logedout plant which are in his database will remian in localstorage
      if (isInWishlist) {
        dispatch(removeFromWishlistStore(data.id));
        showSuccessToast("Removed from wishlist");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      key={data.id}
      href={`/categories/${data.category}/${data.slug}/${data.id}`}
    >
      <div className="relative rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden group">
        <button
          onClick={handleWishlistToggle}
          disabled={loading}
          className={`cursor-pointer absolute top-2 right-2 z-20 p-1 rounded-full shadow-md transition bg-white/80 hover:bg-white ${
            isInWishlist ? "text-red-600" : "text-gray-600"
          }`}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist ? "fill-red-600" : "fill-none"}`}
          />
        </button>

        <ProductListItemPics pics={data.pictures} />
        <p className="text-[#505050] lg:text-[18px] md:text-[36px] text-[18px] font-semibold mt-2 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
          {data.title}
        </p>
      </div>
    </Link>
  );
};

export default PlantCard;
