import { Router } from "express"
import { create, list, getOne, me } from "../controllers/users.controller"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.post("/", create)
router.get("/", list)

router.get("/me", authMiddleware, me)

router.get("/:id", getOne)

export default router