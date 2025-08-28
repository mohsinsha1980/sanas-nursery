"use client";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { PaginationProps } from "@/lib/types/common-types";

export function CustomPagination({
  total,
  perPage,
  pageChange,
}: PaginationProps) {
  const [active, setActive] = useState(1);

  const pages = Math.ceil(total / perPage);
  const items = Array(pages)
    .fill(1)
    .map((e, i) => e + i * 1);

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
    if (pageChange) {
      pageChange(active);
    }
  }, [active, pageChange]);

  return (
    <div className="rounded-md bg-white p-2">
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
            <PaginationPrevious href="javascript:;" className="disable" />
          </PaginationItem>

          {items.map((item) => (
            <PaginationItem key={`page_${item}`}>
              <PaginationLink
                href="javascript:;"
                isActive={active === item}
                onClick={() => setPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            onClick={nextClickHandler}
            className={
              active === pages || pages === 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
          >
            <PaginationNext href="javascript:;" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
