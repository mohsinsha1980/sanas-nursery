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
import { Filter, Search, X, FileText, Activity, Tag, Star } from "lucide-react";
import { useState } from "react";

interface BlogFilterProps {
  setFilters: (filters: BlogFilterTypes) => void;
}

const BlogFilter = ({ setFilters }: BlogFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  const handleSearch = () => {
    setFilters({
      search: searchTerm || undefined,
      status: statusFilter === "all" ? undefined : (statusFilter as "0" | "1"),
      category: categoryFilter === "all" ? undefined : categoryFilter,
      featured:
        featuredFilter === "all" ? undefined : featuredFilter === "true",
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setFeaturedFilter("all");
    setFilters({});
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    featuredFilter !== "all";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Blogs</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Search className="h-4 w-4 text-green-600" />
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-black/10 rounded-md "
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-600" />
            Status
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full border-black/10 rounded-md">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  All Status
                </div>
              </SelectItem>
              <SelectItem value="0" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  Active
                </div>
              </SelectItem>
              <SelectItem value="1" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-orange-500" />
                  Inactive
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Tag className="h-4 w-4 text-green-600" />
            Category
          </label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full border-black/10 rounded-md">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  All Categories
                </div>
              </SelectItem>
              {Object.values(BLOG_CATEGORIES).map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-500" />
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Featured
          </label>
          <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
            <SelectTrigger className="w-full border-black/10 rounded-md">
              <SelectValue placeholder="Select featured" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              <SelectItem value="all" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-400" />
                  All Blogs
                </div>
              </SelectItem>
              <SelectItem value="true" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Featured Only
                </div>
              </SelectItem>
              <SelectItem value="false" className="hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-400" />
                  Non-Featured
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        {hasActiveFilters ? (
          <Button variant="orange" size="sm" onClick={handleClear}>
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        ) : (
          <div></div>
        )}
        <Button onClick={handleSearch} variant="orange" size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default BlogFilter;
