import express from "express"
import cors from "cors"

import productRoutes from "./routes/products"
import categoryRoutes from "./routes/categories"
import heroRoutes from "./routes/heroes"
import usersRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import addressRoutes from "./routes/address.routes"
import favoriteRoutes from "./routes/favorites"

import { authMiddleware } from "./middleware/auth"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/heroes", heroRoutes)
app.use("/api/auth", authRoutes)

app.use("/api/users", authMiddleware, usersRoutes)
app.use("/api/favorites", authMiddleware, favoriteRoutes)
app.use("/api/addresses", authMiddleware, addressRoutes)

app.get("/", (req, res) => {
  res.send("Voke API running 🚀")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})