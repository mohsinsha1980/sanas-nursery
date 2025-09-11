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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          My Wishlist
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Your favorite plants and items
        </p>
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Heart className="mx-auto h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              No items in wishlist
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Start adding plants you love to your wishlist!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {wishlist.map((plant) => (
            <div
              key={plant._id}
              className="flex flex-col items-center cursor-pointer relative group"
            >
              <div className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[250px] aspect-[3/4] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 relative">
                <button
                  onClick={() => handleRemove(plant._id)}
                  className="absolute top-2 right-2 z-20 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 shadow-md transition-all duration-200 hover:scale-110"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                <div className="relative w-full h-full">
                  <Image
                    src={plant.picture || "/images/placeholder-plant.jpg"}
                    alt={plant.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                  {/* Overlay + See Details Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <Link href={`/plants/${plant._id}`}>
                      <Button
                        variant="orange"
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        See Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-sm sm:text-base font-medium text-gray-700 line-clamp-2 px-2">
                {plant.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
