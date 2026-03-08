import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "../types/Product"

type CartItem = Product & {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id)

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            }
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }]
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id)
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        })),

      clearCart: () => set({ items: [] })
    }),
    {
      name: "cart-storage"
    }
  )
)