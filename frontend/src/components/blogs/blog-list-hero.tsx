import { BookOpen, Sparkles, TrendingUp } from "lucide-react";
import React from "react";

const BlogListHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-orange-500 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Our Blog
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
          Discover expert gardening tips, plant care guides, and nursery
          insights to help you grow a thriving garden.
        </p>
        <div className="flex items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Expert Tips</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Fresh Content</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListHero;
