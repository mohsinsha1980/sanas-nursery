"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { BlogFilterTypes } from "@/lib/types/admin-types";
import { FileText, Search, Star, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function BlogFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<BlogFilterTypes>({
    category: searchParams.get("category") || "",
    featured: searchParams.get("featured") === "true" ? true : undefined,
    search: searchParams.get("search") || "",
  });

  const hasActiveFilters =
    filters.category || filters.featured !== undefined || filters.search;

  const updateFilters = useCallback(
    (newFilters: Partial<BlogFilterTypes>) => {
      const updatedFilters = { ...filters, ...newFilters, page: "1" };
      setFilters(updatedFilters);

      const params = new URLSearchParams();

      if (updatedFilters.category) {
        params.set("category", updatedFilters.category);
      }
      if (updatedFilters.featured !== undefined) {
        params.set("featured", updatedFilters.featured.toString());
      }
      if (updatedFilters.search) {
        params.set("search", updatedFilters.search);
      }
      if (updatedFilters.page && updatedFilters.page !== "1") {
        params.set("page", updatedFilters.page);
      }

      const queryString = params.toString();
      router.push(`/blogs${queryString ? `?${queryString}` : ""}`);
    },
    [filters, router]
  );

  const clearFilters = useCallback(() => {
    setFilters({
      category: "",
      featured: undefined,
      search: "",
    });
    router.push("/blogs");
  }, [router]);

  const handleSearch = useCallback(
    (value: string) => {
      updateFilters({ search: value });
    },
    [updateFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      updateFilters({ category: value === "all" ? "" : value });
    },
    [updateFilters]
  );

  const handleFeaturedChange = useCallback(
    (value: string) => {
      updateFilters({
        featured: value === "all" ? undefined : value === "true",
      });
    },
    [updateFilters]
  );

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Search className="h-3 w-3 text-white" />
          </div>
          Search Blogs
        </label>
        <Input
          placeholder="Search by title or content..."
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="h-3 w-3 text-white" />
          </div>
          Category
        </label>
        <Select
          value={filters.category || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
            <SelectItem
              value="all"
              className="hover:bg-gray-50 cursor-pointer rounded-md"
            >
              All Categories
            </SelectItem>
            {Object.values(BLOG_CATEGORIES).map((category) => (
              <SelectItem
                key={category.value}
                value={category.value}
                className="hover:bg-gray-50 cursor-pointer rounded-md"
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Featured Filter */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Star className="h-3 w-3 text-white" />
          </div>
          Featured
        </label>
        <Select
          value={
            filters.featured === undefined ? "all" : filters.featured.toString()
          }
          onValueChange={handleFeaturedChange}
        >
          <SelectTrigger className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg">
            <SelectValue placeholder="All Blogs" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
            <SelectItem
              value="all"
              className="hover:bg-gray-50 cursor-pointer rounded-md"
            >
              All Blogs
            </SelectItem>
            <SelectItem
              value="true"
              className="hover:bg-gray-50 cursor-pointer rounded-md"
            >
              Featured Only
            </SelectItem>
            <SelectItem
              value="false"
              className="hover:bg-gray-50 cursor-pointer rounded-md"
            >
              Regular Only
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200 hover:border-orange-300 font-medium py-2 rounded-lg transition-all duration-300"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
