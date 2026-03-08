import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

interface JwtPayload {
  userId: string
}

export interface AuthRequest extends Request {
  user?: {
    id: string
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    req.user = {
      id: decoded.userId
    }

    next()
  } catch {
    res.status(401).json({ error: "Token inválido" })
  }
}