"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  totalPages: number;
  currentPage: number;
}

function Pagination({ totalPages, currentPage }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (newPageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPageNumber > 1) {
      params.set("page", newPageNumber.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  const visiblePages = Array.from(
    new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])
  )
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous Page</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <span key={`gap-${page}`} className="contents">
              {index > 0 && page - visiblePages[index - 1] > 1 && (
                <span className="px-1 text-sm text-muted-foreground" aria-hidden="true">…</span>
              )}
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={cn(
                "h-9 w-9 p-0 font-medium transition-all",
                currentPage === page
                  ? "bg-primary hover:bg-violet-700 text-white shadow-lg shadow-primary/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800",
              )}
            >
              {page}
            </Button>
            </span>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>

      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
        Showing Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default Pagination;
