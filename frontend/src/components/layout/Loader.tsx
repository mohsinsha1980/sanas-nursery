"use client";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector(
    (state: RootState) => (state.ui as { loader: boolean }).loader
  );

  return (
    loader && (
      <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[var(--txt-orange)]"></div>
            <div className="absolute w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-[var(--txt-orange)]/30"></div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Loading...</h3>
            <p className="text-sm text-gray-600">
              Please wait while we prepare your experience
            </p>
          </div>

          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-[var(--txt-orange)] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-[var(--txt-orange)] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[var(--txt-orange)] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    )
  );
};

export default Loader;
