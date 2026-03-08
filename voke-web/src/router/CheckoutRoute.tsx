import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"

export default function CheckoutRoute({ children }: any) {
  const token = useAuthStore((state) => state.token)
  const items = useCartStore((state) => state.items)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return children
}