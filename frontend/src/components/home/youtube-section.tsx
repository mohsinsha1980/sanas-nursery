"use client";

import React, { useEffect, useState } from "react";

type Video = {
  id: string;
  title: string;

  thumbnail: string;
};

const videos: Video[] = [
  {
    id: "9wY_-ZMQ-jQ",
    title: "Video 1",
    thumbnail: "https://img.youtube.com/vi/9wY_-ZMQ-jQ/hqdefault.jpg",
  },
  {
    id: "Kfwck39Tsv8",
    title: "Video 2",
    thumbnail: "https://img.youtube.com/vi/Kfwck39Tsv8/hqdefault.jpg",
  },
];

const YoutubeSection: React.FC = () => {
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full bg-[rgba(228,255,240,1)] py-12 md:py-16 flex justify-center">
      <div className="w-full max-w-[1370px] flex flex-col items-center px-4">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold leading-snug">
            See the <span className="text-green-700">Green</span> Experience
          </h2>
          <p className="text-base sm:text-lg md:text-[20px] mt-2 text-gray-700">
            Watch how our plants are spreading smiles and freshness.
          </p>
        </div>

        {/* Thumbnails (open modal on click) */}
        <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setOpenVideo(v.id)}
              className="relative w-full md:w-[500px] h-[220px] sm:h-[260px] md:h-[300px] 
                         rounded-lg overflow-hidden shadow-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              aria-label={`Play ${v.title}`}
            >
              <img
                src={v.thumbnail}
                alt={v.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Play overlay */}
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
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://www.youtube.com/@sanasNursery"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 md:mt-10 w-[160px] sm:w-[180px] md:w-[191px] h-[50px] sm:h-[56px] md:h-[62px] flex items-center justify-center 
                     text-white bg-[rgba(243,117,33,1)] border border-[rgba(243,117,33,1)] 
                     rounded-[10px] text-base sm:text-lg font-medium hover:bg-orange-600 transition"
        >
          View on YouTube
        </a>
      </div>

      {/* Modal */}
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
