import { Request, Response } from "express"
import { AuthRequest } from "../middleware/auth"

import {
  createUser,
  getUsers,
  getUserById
} from "../services/users.service"

export const create = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)

    res.json(user)
  } catch (error: any) {
    res.status(400).json({
      error: error.message || "Erro ao criar usuário"
    })
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const users = await getUsers()

    res.json(users)
  } catch {
    res.status(500).json({ error: "Erro ao buscar usuários" })
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

    const user = await getUserById(id)

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json(user)
  } catch {
    res.status(500).json({ error: "Erro ao buscar usuário" })
  }
}

export const me = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id as string

    if (!userId) {
      return res.status(401).json({
        error: "Usuário não autenticado"
      })
    }

    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      })
    }

    res.json(user)
  } catch {
    res.status(500).json({
      error: "Erro ao buscar usuário"
    })
  }
}