"use client";

import { PlantsCardType } from "@/lib/types/common-types";
import Link from "next/link";
import ProductListItemPics from "../common/product-list-item-pics";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  showErrorToast,
  showSuccessToast,
  getErrorMessage,
} from "@/lib/helper";
import { AxiosError } from "axios";
import { useState } from "react";
import { ROLES } from "@/lib/constants";
import { removeFromWishlist, saveToWishlist } from "@/lib/api-routes/api-user";
import { addToWishlist, removeFromWishlistStore } from "@/redux/wishListSlice";

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
        if (user?.role !== ROLES.USER) {
          await saveToWishlist(data.id);
        }
        dispatch(addToWishlist(data.id));
        showSuccessToast("Added to wishlist");
      }
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
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
        <p className="text-[#505050] lg:text-[18px] md:text-[36px] text-[28px] font-semibold mt-2 text-center transition-colors duration-300 group-hover:text-[#DA5700]">
          {data.title}
        </p>
      </div>
    </Link>
  );
};

export default PlantCard;
