import { prisma } from "../lib/prisma"

let categoriesCache: any = null
let lastFetch = 0

const CACHE_TIME = 1000 * 60

export const getCategoriesService = async () => {
  const now = Date.now()

  if (categoriesCache && now - lastFetch < CACHE_TIME) {
    return categoriesCache
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  categoriesCache = categories
  lastFetch = now

  return categories
}