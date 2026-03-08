import { api } from "./api"

export const getHeroes = async () => {
  const response = await api.get("/api/heroes")
  return response.data
}