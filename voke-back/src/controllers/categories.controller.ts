import { Request, Response } from "express"
import { getCategoriesService } from "../services/category.service"

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" })
  }
}