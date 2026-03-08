import { api } from "./api"

export async function createAddress(data: any) {
  const res = await api.post("/api/addresses", data)
  return res.data
}

export async function getMyAddresses() {
  const res = await api.get("/api/addresses/me")
  return res.data
}