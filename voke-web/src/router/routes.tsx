import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home/Home"
import ProductPage from "../pages/Product/ProductPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import CartPage from "../pages/CartPage/CartPage"
import CheckoutPage from "../pages/Checkout/CheckoutPage"
import ProfilePage from "../pages/Profile/ProfilePage"

import PublicRoute from "../router/PublicRoute"
import CheckoutRoute from "../router/CheckoutRoute"
import ProtectedRoute from "../router/ProtectedRoute"

export default function RoutesApp() {
  return (
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
  )
}