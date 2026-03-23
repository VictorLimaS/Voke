import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import PublicRoute from "../router/PublicRoute"
import CheckoutRoute from "../router/CheckoutRoute"
import ProtectedRoute from "../router/ProtectedRoute"

const Home = lazy(() => import("../pages/Home/Home"))
const ProductPage = lazy(() => import("../pages/Product/ProductPage"))
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"))
const CartPage = lazy(() => import("../pages/CartPage/CartPage"))
const CheckoutPage = lazy(() => import("../pages/Checkout/CheckoutPage"))
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"))

export default function RoutesApp() {
  return (
    <Suspense fallback={null}>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/checkout"
          element={
            <CheckoutRoute>
              <CheckoutPage />
            </CheckoutRoute>
          }
        />

        <Route
          path="/checkout/payment"
          element={
            <CheckoutRoute>
              <CheckoutPage />
            </CheckoutRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  )
}