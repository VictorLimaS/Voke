import { Layout, Input, Badge, Grid } from "antd"
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"
import { useEffect, useState } from "react"

const { Header } = Layout
const { Search } = Input
const { useBreakpoint } = Grid

interface Props {
  onOpenCart: () => void
}

export default function HeaderBar({ onOpenCart }: Props) {

  const navigate = useNavigate()
  const location = useLocation()

  const screens = useBreakpoint()
  const isMobile = !screens.md

  const isLoginPage = location.pathname === "/login"

  const items = useCartStore((state) => state.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const [shake, setShake] = useState(false)

  const token = localStorage.getItem("token")

  useEffect(() => {

    if (totalItems > 0) {

      setShake(true)

      const t = setTimeout(() => setShake(false), 600)

      return () => clearTimeout(t)

    }

  }, [totalItems])

  const handleUserClick = () => {

    if (token) {
      navigate("/profile")
    } else {
      navigate("/login")
    }

  }

  return (

    <Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: 0,
        height: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          display: "flex",
          alignItems: "center",
          justifyContent: isLoginPage ? "center" : "space-between",
          padding: isMobile ? "0 16px" : "0 32px",
          gap: 20
        }}
      >


        <div
          onClick={() => navigate("/")}
          style={{
            fontSize: 22,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Voke
        </div>


        {!isLoginPage && (
          <>
            {!isMobile && (
              <Search
                placeholder="Buscar produtos"
                allowClear
                size="large"
                style={{
                  maxWidth: 520,
                  flex: 1
                }}
              />
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20
              }}
            >

              <UserOutlined
                onClick={handleUserClick}
                style={{
                  fontSize: 24,
                  cursor: "pointer"
                }}
              />

              <Badge
                count={totalItems}
                className={totalItems > 0 ? "cart-badge-vibrate" : ""}
              >

                <ShoppingCartOutlined
                  className={`cart-icon ${shake ? "cart-shake" : ""}`}
                  onClick={onOpenCart}
                  style={{
                    fontSize: 24,
                    cursor: "pointer"
                  }}
                />

              </Badge>

            </div>
          </>
        )}

      </div>


      {!isLoginPage && isMobile && (

        <div
          style={{
            position: "absolute",
            top: 72,
            width: "100%",
            padding: "12px 16px",
            background: "#fff",
            borderBottom: "1px solid #eee"
          }}
        >

          <Search
            placeholder="Buscar produtos"
            allowClear
            size="large"
          />

        </div>

      )}

    </Header>

  )

}