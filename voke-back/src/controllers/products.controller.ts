import { Request, Response } from "express"
import {
  createProduct,
  getProducts,
  getProductById
} from "../services/products.service"

export const create = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body)
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" })
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const categoryId =
      typeof req.query.categoryId === "string"
        ? req.query.categoryId
        : undefined

    const products = await getProducts(categoryId)

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" })
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const id =
      typeof req.params.id === "string"
        ? req.params.id
        : undefined

    if (!id) {
      return res.status(400).json({ error: "ID inválido" })
    }

    const product = await getProductById(id)

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" })
  }
}