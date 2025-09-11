"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";

export default function BlogSearch() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(search || "");
  }, [search]);

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    shallow: false,
  });

  const hasSearch = search && search.length > 0;

  const handleSearch = useCallback(() => {
    if (page !== "1") {
      setPage("1");
    }
  }, [page, setPage]);

  const clearSearch = useCallback(() => {
    setSearch("");
    setPage("1");
    setSearchText("");
  }, [setSearch, setPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchText.trim());
    handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search articles by title, content, or tags..."
            value={searchText || ""}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-12 pr-20 py-6 text-lg border-2 border-gray-200 rounded-lg bg-white shadow-lg"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {hasSearch && (
              <Button
                type="button"
                onClick={clearSearch}
                variant="ghost"
                size="sm"
                className="mr-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </Button>
            )}
            <Button type="submit" variant={"orange"} size={"lg"} className="">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {hasSearch && (
            <Button
              type="button"
              onClick={clearSearch}
              variant="outline"
              size="sm"
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Search
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
