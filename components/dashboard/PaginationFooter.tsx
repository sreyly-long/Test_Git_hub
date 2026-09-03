import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "./icons";

type PaginationFooterProps = {
  showingFrom: number;
  showingTo: number;
  total: number;
  currentPage: number;
  totalPages: number;
  basePath: string;
  pageSizeLabel?: string;
};

function pageHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}page=${page}`;
}

function buildPageList(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });
  return result;
}

export function PaginationFooter({
  showingFrom,
  showingTo,
  total,
  currentPage,
  totalPages,
  basePath,
  pageSizeLabel = "10 / page",
}: PaginationFooterProps) {
  const pages = buildPageList(currentPage, Math.max(totalPages, 1));
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e1e0d9] pt-4">
      <p className="text-xs text-[#898781]">
        Showing {showingFrom} to {showingTo} of {total} entries
      </p>

      <div className="flex items-center gap-3">
        <span className="rounded-lg border border-[#e1e0d9] px-2.5 py-1.5 text-xs text-[#52514e]">
          {pageSizeLabel}
        </span>

        <nav className="flex items-center gap-1">
          {hasPrev ? (
            <Link
              href={pageHref(basePath, currentPage - 1)}
              aria-label="Previous page"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
            >
              <IconChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#c3c2b7]">
              <IconChevronLeft className="h-4 w-4" />
            </span>
          )}

          {pages.map((page, i) =>
            page === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-[#898781]">
                ...
              </span>
            ) : (
              <Link
                key={page}
                href={pageHref(basePath, page)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium ${
                  page === currentPage
                    ? "bg-[#2a78d6] text-white"
                    : "text-[#52514e] hover:bg-black/[.04]"
                }`}
              >
                {page}
              </Link>
            ),
          )}

          {hasNext ? (
            <Link
              href={pageHref(basePath, currentPage + 1)}
              aria-label="Next page"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
            >
              <IconChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#c3c2b7]">
              <IconChevronRight className="h-4 w-4" />
            </span>
          )}
        </nav>
      </div>
    </div>
  );
}
