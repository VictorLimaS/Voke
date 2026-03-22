import { Request, Response } from "express"
import {
  addFavorite,
  removeFavorite,
  getFavorites
} from "../services/favorite.service"

// 🔹 criar favorito
export const createFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const productId = req.body.productId as string

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    const favorite = await addFavorite(userId, productId)

    res.json(favorite)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create favorite" })
  }
}

// 🔹 tipagem correta do params 👇
type DeleteParams = {
  productId: string
}

// 🔹 deletar favorito
export const deleteFavorite = async (
  req: Request<DeleteParams>,
  res: Response
) => {
  try {
    const userId = req.user?.id
    const productId = req.params.productId

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    await removeFavorite(userId, productId)

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to remove favorite" })
  }
}

// 🔹 listar favoritos
export const myFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    const favorites = await getFavorites(userId)

    res.json(favorites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to get favorites" })
  }
}