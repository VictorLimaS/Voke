import { prisma } from "../lib/prisma"

let productsCache: any = null
let lastFetch = 0

const CACHE_TIME = 1000 * 60 * 5

export const createProduct = async (data: any) => {
  const product = await prisma.product.create({
    data
  })

  productsCache = null

  return product
}

export const getProducts = async (categoryId?: string) => {
  const now = Date.now()

  if (!categoryId && productsCache && now - lastFetch < CACHE_TIME) {
    return productsCache
  }

  const products = await prisma.product.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      category: true
    }
  })

  if (!categoryId) {
    productsCache = products
    lastFetch = now
  }

  return products
}

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: {
      id
    },
    include: {
      category: true,
      images: true
    }
  })
}