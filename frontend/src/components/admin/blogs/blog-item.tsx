"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFormattedDate, getPicURL, STATUS } from "@/lib/helper";
import { BlogDataType } from "@/lib/types/common-types";
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  MoreVertical,
  Power,
  Star,
  Tag,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BlogItemProps {
  blog: BlogDataType;
  onDelete: (blogId: string) => void;
  onToggleStatus: (blogId: string) => void;
  onToggleFeatured: (blogId: string) => void;
}

const BlogItem = ({
  blog,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}: BlogItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleStatus = async () => {
    setIsLoading(true);
    try {
      onToggleStatus(blog._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeatured = async () => {
    setIsLoading(true);
    try {
      onToggleFeatured(blog._id);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      "0": {
        label: "Active",
        color: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      "1": {
        label: "Inactive",
        color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      },
    };

    const statusInfo =
      statusMap[status as keyof typeof statusMap] || statusMap["1"];

    return (
      <Badge
        className={`${statusInfo.color} font-medium py-1 h-6 flex items-center`}
      >
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="relative h-40 sm:h-48 w-full rounded-t-lg overflow-hidden">
        <Image
          src={getPicURL(blog.coverImage)}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 sm:gap-2">
          {blog.featured && (
            <Badge className="bg-orange-500 text-white font-medium hover:bg-orange-200 text-xs sm:text-sm py-1 h-6 flex items-center">
              <Star className="h-3 w-3 mr-1" />
              <span>Featured</span>
            </Badge>
          )}
          {getStatusBadge(blog.status)}
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Tag className="h-4 w-4" />
            <span className="font-medium">{blog.category}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 mb-4">
          {blog.author && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{blog.author}</span>
            </div>
          )}
          {blog.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readingTime} min read</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{getFormattedDate(blog.createdAt)}</span>
          </div>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 3).map((tag, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.label}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{blog.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex-1"></div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            {blog.status === STATUS.ACTIVE ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/blogs/${blog.slug}`)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Eye className="h-4 w-4" />
              </Button>
            ) : null}
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/blogs/edit?blog=${blog._id}`)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(blog._id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={isLoading}>
                <MoreVertical className="h-4 w-4 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-black/20">
              <DropdownMenuItem
                onClick={handleToggleStatus}
                disabled={isLoading}
                className="text-orange-600 hover:text-orange-700"
              >
                <Power className="h-4 w-4 mr-2" />
                {blog.status === "0" ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleToggleFeatured}
                disabled={isLoading}
                className="text-yellow-600 hover:text-yellow-700"
              >
                <Star className="h-4 w-4 mr-2" />
                {blog.featured ? "Remove from Featured" : "Mark as Featured"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
