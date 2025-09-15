"use client";
import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#E4FFF0] via-white to-[#F0FDF4] z-50 flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-lg mx-auto px-6">
        <div className="w-full max-w-sm mx-auto text-center">
          <div className="relative mb-8 flex items-center justify-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[var(--txt-orange)] border-r-[var(--bg-green)]"></div>
            <div
              className="absolute w-12 h-12 border-3 border-transparent rounded-full animate-spin border-t-[var(--bg-green)] border-r-[var(--txt-orange)]"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
            <div className="absolute w-6 h-6 bg-gradient-to-r from-[var(--txt-orange)] to-[var(--bg-green)] rounded-full"></div>
          </div>
          <div className="animate-fade-in">
            <p className="text-sm text-gray-600">Please wait...</p>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--txt-orange)]/30 rounded-full animate-float"></div>
          <div
            className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[var(--bg-green)]/30 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[var(--txt-orange)]/40 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-[var(--bg-green)]/20 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
