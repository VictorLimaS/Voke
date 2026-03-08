import { api } from "./api"
import type { Product } from "../types/Product"

export const getProducts = async (categoryId?: string) => {
  const response = await api.get("/products", {
    params: { categoryId }
  })

  return response.data
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`)
  return response.data
}