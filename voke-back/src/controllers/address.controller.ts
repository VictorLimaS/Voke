import { Response } from "express"
import { prisma } from "../lib/prisma"
import { AuthRequest } from "../middleware/auth"

export const createAddress = async (req: AuthRequest, res: Response) => {
  try {

    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" })
    }

    const {
      street,
      number,
      zip,
      city,
      state,
      country,
      cpf,
      saveCpf
    } = req.body

    const address = await prisma.address.create({
      data: {
        userId,
        street,
        number,
        zip,
        city,
        state,
        country
      }
    })

    console.log("REQ USER:", req.user)

    if (saveCpf && cpf) {
      await prisma.user.update({
        where: { id: userId },
        data: { cpf }
      })
    }

    console.log("USER ID:", userId)

    res.json(address)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao salvar endereço" })
  }
}


export const getMyAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" })
    }

    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc"
      }
    })

    res.json(addresses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar endereços" })
  }
}