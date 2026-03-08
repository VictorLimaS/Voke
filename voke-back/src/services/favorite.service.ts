import { prisma } from "../lib/prisma"

export const addFavorite = async (userId: string, productId: string) => {

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId,
        productId
      }
    }
  })

  if (existing) {
    return existing
  }

  return prisma.favorite.create({
    data: {
      userId,
      productId
    }
  })
}

export const removeFavorite = async (userId: string, productId: string) => {
  return prisma.favorite.delete({
    where: {
      userId_productId: {
        userId,
        productId
      }
    }
  })
}

export const getFavorites = async (userId: string) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      product: true
    }
  })
}