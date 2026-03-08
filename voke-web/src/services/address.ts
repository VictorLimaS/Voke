import { api } from "./api"

export async function createAddress(data: any) {
  const res = await api.post("/addresses", data)
  return res.data
}

export async function getMyAddresses() {
  const res = await api.get("/addresses/me")
  return res.data
}