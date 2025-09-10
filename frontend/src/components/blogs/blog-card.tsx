import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, getCategoryLabel, getPicURL } from "@/lib/helper";
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

interface BlogCardProps {
  blog: BlogDataType;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-green-200">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={getPicURL(blog.coverImage)}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {blog.category && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-gray-700 font-medium text-xs px-2 py-1">
              <Tag className="h-3 w-3 mr-1" />
              {getCategoryLabel(blog.category)}
            </Badge>
          </div>
        )}

        {blog.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500 text-white font-semibold text-xs px-2 py-1">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
          <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          {blog.author && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium">{blog.author}</span>
            </div>
          )}
          {blog.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readingTime} min</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 2).map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-gray-50 hover:bg-gray-100"
              >
                {tag}
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
            variant="outline"
            className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 hover:border-green-300 font-medium py-2 rounded-lg transition-all duration-300 group-hover:shadow-md"
          >
            <Link href={`/blogs/${blog.slug}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              Read Article
              <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
