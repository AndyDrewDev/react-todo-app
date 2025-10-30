export const getTotalPages = (totalItems: number, pageSize: number): number => {
  if (pageSize <= 0) {
    return 1
  }

  return Math.max(1, Math.ceil(totalItems / pageSize))
}

// clamp the page number to the total number of pages to avoid out of bounds
export const clampPage = (page: number, totalPages: number): number => {
  if (!Number.isFinite(page) || page < 1) {
    return 1
  }

  if (!Number.isFinite(totalPages) || totalPages < 1) {
    return 1
  }

  return Math.min(
    Math.max(1, Math.floor(page)),
    Math.floor(totalPages),
  )
}

export const paginate = <T,>(items: T[], page: number, pageSize: number): T[] => {
  if (pageSize <= 0) {
    return items
  }

  const totalPages = getTotalPages(items.length, pageSize)
  const safePage = clampPage(page, totalPages)
  const start = (safePage - 1) * pageSize
  const end = start + pageSize

  return items.slice(start, end)
}

