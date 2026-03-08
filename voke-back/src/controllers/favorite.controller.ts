import { Request, Response } from "express"
import { addFavorite, removeFavorite, getFavorites } from "../services/favorite.service"
import { AuthRequest } from "../middleware/auth"

export const createFavorite = async (req: AuthRequest, res: Response) => {
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

export const deleteFavorite = async (req: AuthRequest, res: Response) => {
  try {

    const userId = req.user?.id
    const productId = req.params.productId as string

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    await removeFavorite(userId, productId)

    res.json({ success: true })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to delete favorite" })
  }
}

export const myFavorites = async (req: AuthRequest, res: Response) => {
  try {

    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    const favorites = await getFavorites(userId)

    res.json(favorites)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch favorites" })
  }
}