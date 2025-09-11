"use client";
import { useState } from "react";
import { PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HomeVideosSectionProps {
  videos: string[];
}

export default function HomeVideosSection({ videos }: HomeVideosSectionProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Watch Our Videos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about plant care and gardening tips from our experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((videoUrl, index) => {
            const embedUrl = getEmbedUrl(videoUrl);
            const videoId = extractVideoId(videoUrl);
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : null;

            return (
              <div key={index} className="relative">
                {playingVideo === videoUrl && embedUrl ? (
                  <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                    <iframe
                      src={embedUrl}
                      title={`Video ${index + 1}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={`Video thumbnail ${index + 1}`}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <PlayIcon className="h-16 w-16 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
                      <Button
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4"
                        onClick={() => setPlayingVideo(videoUrl)}
                      >
                        <PlayIcon className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
