import { Router } from "express"
import { createAddress, getMyAddresses } from "../controllers/address.controller"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.post("/", authMiddleware, createAddress)
router.get("/me", authMiddleware, getMyAddresses)

export default router