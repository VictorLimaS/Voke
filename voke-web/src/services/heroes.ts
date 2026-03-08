import { api } from "./api"

export const getHeroes = async () => {
  const response = await api.get("/heroes")
  return response.data
}