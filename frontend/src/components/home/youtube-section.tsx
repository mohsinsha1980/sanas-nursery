"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function getYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    } else if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
  } catch {
    return null;
  }
  return null;
}

const YoutubeSection = ({ videos }: { videos: string[] }) => {
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full h-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex justify-center">
      <div className="w-full max-w-[1370px] flex flex-col items-center px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            See the <span className="text-green-700">Green</span> Experience
          </h2>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
            Watch how our plants are spreading smiles and freshness.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
          {videos.map((url, idx) => {
            const id = getYoutubeId(url);
            if (!id) return null;
            const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setOpenVideo(id)}
                className="relative w-full md:w-[500px] h-[220px] sm:h-[260px] md:h-[300px] 
                           rounded-lg overflow-hidden shadow-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                aria-label={`Play Video ${idx + 1}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={thumbnail}
                    alt={`Video ${idx + 1}`}
                    fill
                    className="object-cover scale-107 group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        <Link
          href="https://www.youtube.com/@sanasNursery"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="orange" size="lg" className="lg:mt-10 md:mt-10 mt-5">
            View on YouTube
          </Button>
        </Link>
      </div>

      {openVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenVideo(null)}
        >
          <div
            className="relative w-[90%] max-w-[800px] h-[50vh] md:h-[70vh] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={openVideo}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Close */}
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpenVideo(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeSection;
