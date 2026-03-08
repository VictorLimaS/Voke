import { Router } from "express"
import { createFavorite, deleteFavorite, myFavorites } from "../controllers/favorite.controller"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.post("/", authMiddleware, createFavorite)
router.delete("/:productId", authMiddleware, deleteFavorite)
router.get("/", authMiddleware, myFavorites)

export default router