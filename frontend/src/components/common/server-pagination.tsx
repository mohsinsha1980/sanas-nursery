"use client";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { PaginationProps } from "@/lib/types/common-types";
import { useQueryState } from "nuqs";

export function ServerPagination({
  total,
  perPage,
  currentPage,
}: PaginationProps) {
  const [active, setActive] = useState(currentPage || 1);
  const [, setSearchPage] = useQueryState("page", { shallow: false });

  const pages = Math.ceil(total / perPage);

  const previousClickHandler = (): void => {
    if (active > 1) {
      setActive((prev) => prev - 1);
    }
  };

  const nextClickHandler = (): void => {
    if (active < pages) {
      setActive((prev) => prev + 1);
    }
  };

  const setPage = (page: number): void => {
    setActive(page);
  };

  useEffect(() => {
    setSearchPage(active.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active, setSearchPage]);

  const getVisiblePages = () => {
    const start = Math.max(1, active - 1);
    const end = Math.min(pages, start + 2);
    const windowPages = [];

    for (let i = start; i <= end; i++) {
      windowPages.push(i);
    }

    return windowPages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="rounded-md bg-white p-2 mb-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={
              active <= 1 || pages === 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
            onClick={previousClickHandler}
          >
            <PaginationPrevious href="" />
          </PaginationItem>

          {visiblePages.map((page) => (
            <PaginationItem key={`page_${page}`}>
              <PaginationLink
                href=""
                isActive={active === page}
                onClick={() => setPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {visiblePages[visiblePages.length - 1] < pages && (
            <PaginationEllipsis />
          )}

          <PaginationItem
            onClick={nextClickHandler}
            className={
              active === pages || pages === 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
          >
            <PaginationNext href="" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
