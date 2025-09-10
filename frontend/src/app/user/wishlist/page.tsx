"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserWishlist, removeFromWishlist } from "@/lib/api-routes/api-user";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { WishlistItem } from "@/lib/types/user-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        dispatch(showLoader());
        const response = await getUserWishlist();
        const data: WishlistItem[] = response.data?.data;
        setWishlist(data);
      } catch (error: unknown) {
        showErrorToast(getErrorMessage(error as AxiosError));
      } finally {
        setIsLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchWishlist();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  const handleRemove = async (id: string) => {
    try {
      dispatch(showLoader());
      await removeFromWishlist(id);
      showSuccessToast("Item removed from wishlist");
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">Your favorite plants and items</p>
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Heart className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items in wishlist
            </h3>
            <p className="text-gray-600">
              Start adding plants you love to your wishlist!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 gap-x-1 lg:gap-y-12 gap-y-5 justify-items-center">
          {wishlist.map((plant) => (
            <div
              key={plant._id}
              className="flex flex-col items-center cursor-pointer relative"
            >
              <div className="w-[200px] md:w-[240px] lg:w-[250px] h-[300px] sm:h-[320px] md:h-[350px] lg:h-[375px] rounded-[10px] overflow-hidden transition-transform duration-300 hover:scale-105 group lg:px-0 px-4 relative">
                <button
                  onClick={() => handleRemove(plant._id)}
                  className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white text-red-600 rounded-full p-1 shadow-md transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative w-full h-full">
                  <Image
                    // src={getPicURL(plant.picture)}
                    src={plant.picture || "/images/placeholder-plant.jpg"}
                    alt={plant.title}
                    width={250}
                    height={300}
                    className="rounded-[10px] object-cover"
                  />

                  {/* Overlay + See Details Button */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-[10px] flex items-center justify-center">
                    <Link href={`/plants/${plant._id}`}>
                      <Button variant="orange" className="bg-orange-700">
                        See Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-lg font-medium text-gray-700">
                {plant.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




