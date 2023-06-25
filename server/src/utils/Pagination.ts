export function Pagination<T>(array: T[], page: number, perPage: number): {
    results: T[];
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  } {
    const skip = (page - 1) * perPage;
    const paginatedArray = array.slice(skip, skip + perPage);
    const total = array.length;
    const totalPages = Math.ceil(total / perPage);
    const currentPage = Math.min(page, totalPages);
  
    return {
      results: paginatedArray,
      total,
      perPage,
      currentPage,
      totalPages,
    };
  }
  