import { Router } from "express"
import { create, list, getOne } from "../controllers/products.controller"

const router = Router()

router.post("/", create)
router.get("/", list)
router.get("/:id", getOne)

export default router