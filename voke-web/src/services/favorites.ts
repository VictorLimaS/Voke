import { api } from "./api"

export const addFavorite = async (productId: string) => {
  const { data } = await api.post("/favorites", { productId })
  return data
}

export const removeFavorite = async (productId: string) => {
  const { data } = await api.delete(`/favorites/${productId}`)
  return data
}

export const getFavorites = async () => {
  const { data } = await api.get("/favorites")
  return data
}