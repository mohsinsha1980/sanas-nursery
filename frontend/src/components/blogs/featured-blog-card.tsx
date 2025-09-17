import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryLabel, getFormattedDate, getPicURL } from "@/lib/helper";
import { BlogDataType } from "@/lib/types/common-types";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Star,
  Tag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedBlogCardProps {
  blog: BlogDataType;
}

export default function FeaturedBlogCard({ blog }: FeaturedBlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 h-full flex flex-col">
      <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={getPicURL(blog.coverImage)}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <div className="absolute top-4 left-4">
            <Badge className="bg-orange-500 text-white font-semibold px-3 py-1 h-6 flex items-center">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>

          {blog.category && (
            <div className="absolute top-4 right-4">
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-700 font-medium px-3 py-1 h-6 flex items-center"
              >
                <Tag className="h-3 w-3 mr-1" />
                {getCategoryLabel(blog.category)}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-8 flex flex-col flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-green-900 transition-colors">
            {blog.title}
          </h2>

          <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-sm text-gray-500 mb-6">
            {blog.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">{blog.author}</span>
              </div>
            )}
            {blog.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readingTime} min read</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{getFormattedDate(blog.createdAt)}</span>
            </div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {blog.tags.slice(0, 2).map((tag, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-gray-50 hover:bg-gray-100"
                >
                  {tag.label}
                </Badge>
              ))}
              {blog.tags.length > 2 && (
                <Badge variant="outline" className="text-xs bg-gray-50">
                  +{blog.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          <div className="mt-auto">
            <Button
              asChild
              className="w-full text-orange-400 hover:text-orange-500 hover:bg-orange-50 border-orange-200 hover:border-orange-300 font-medium py-2 rounded-lg transition-all duration-300 "
            >
              <Link href={`/blogs/${blog.slug}`}>
                <BookOpen className="h-5 w-5 mr-2" />
                Read Full Article
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}
