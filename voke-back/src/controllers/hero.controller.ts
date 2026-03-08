import { Request, Response } from "express"
import { getHeroes } from "../services/hero.service"

export const list = async (req: Request, res: Response) => {
  try {
    const heroes = await getHeroes()
    res.json(heroes)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar hero" })
  }
}