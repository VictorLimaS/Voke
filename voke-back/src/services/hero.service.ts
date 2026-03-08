import { prisma } from "../lib/prisma"

let heroCache: any = null
let lastFetch = 0

const CACHE_TIME = 1000 * 60 * 5

export const getHeroes = async () => {
  const now = Date.now()

  if (heroCache && now - lastFetch < CACHE_TIME) {
    return heroCache
  }

  const heroes = await prisma.hero.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  heroCache = heroes
  lastFetch = now

  return heroes
}