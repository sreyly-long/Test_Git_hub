export const PAGE_SIZE = 10;

export function parsePage(searchParams: { page?: string } | undefined): number {
  const page = Number(searchParams?.page ?? "1");
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export type PaginationMeta = {
  currentPage: number;
  totalPages: number;
  total: number;
  showingFrom: number;
  showingTo: number;
  skip: number;
  take: number;
};

export function paginationMeta(currentPage: number, total: number, pageSize: number = PAGE_SIZE): PaginationMeta {
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const safePage = Math.min(currentPage, totalPages);
  const showingFrom = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = Math.min(safePage * pageSize, total);

  return {
    currentPage: safePage,
    totalPages,
    total,
    showingFrom,
    showingTo,
    skip: (safePage - 1) * pageSize,
    take: pageSize,
  };
}
