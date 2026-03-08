import { prisma } from "../lib/prisma"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/jwt"

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error("Senha inválida")
  }

  const token = generateToken(user.id)

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}