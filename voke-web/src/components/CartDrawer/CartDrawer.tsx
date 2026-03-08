import { Drawer, Button, Grid } from "antd"
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { useCartStore } from "../../store/cartStore"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const { useBreakpoint } = Grid

interface Props {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const navigate = useNavigate()
  const screens = useBreakpoint()
  const isMobile = screens.md === false

  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increase = useCartStore((state) => state.increaseQuantity)
  const decrease = useCartStore((state) => state.decreaseQuantity)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  useEffect(() => {
    const body = document.body

    if (open) {
      body.style.overflow = "hidden"
      body.style.touchAction = "none"
    } else {
      body.style.overflow = ""
      body.style.touchAction = ""
    }

    return () => {
      body.style.overflow = ""
      body.style.touchAction = ""
    }
  }, [open])

  return (
    <Drawer
      title="Seu carrinho"
      placement="right"
      width={isMobile ? "100%" : 380}
      open={open}
      onClose={onClose}
      getContainer={false}
      style={{
        height: isMobile ? "100vh" : undefined
      }}
      styles={{
        body: {
          paddingBottom: 80,
          display: "flex",
          flexDirection: "column",
          height: isMobile ? "100%" : undefined
        }
      }}
    >
      {items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "#888" }}>Seu carrinho está vazio</p>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto" }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                borderBottom: "1px solid #eee",
                paddingBottom: 16
              }}
            >
              <img
                src={item.mainImage}
                alt={item.name}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 8
                }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    marginBottom: 4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#666",
                    marginBottom: 8
                  }}
                >
                  R${" "}
                  {item.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <Button
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={() => decrease(item.id)}
                  />

                  <span
                    style={{
                      minWidth: 24,
                      textAlign: "center",
                      fontWeight: 500
                    }}
                  >
                    {item.quantity}
                  </span>

                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => increase(item.id)}
                  />
                </div>
              </div>

              <DeleteOutlined
                onClick={() => removeFromCart(item.id)}
                style={{
                  fontSize: 18,
                  color: "#ff4d4f",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  padding: "4px"
                }}
              />
            </div>
          ))}

          <div
            style={{
              marginTop: 10,
              fontWeight: 600,
              fontSize: 18,
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0"
            }}
          >
            <span>Total</span>

            <span>
              R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}
            </span>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: isMobile ? 20 : "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingTop: 20,
          background: "#fff"
        }}
      >
        {items.length > 0 && (
          <Button
            type="primary"
            block
            size="large"
            onClick={() => {
              onClose()
              navigate("/cart")
            }}
            style={{
              height: 48,
              borderRadius: 8,
              background: "#000",
              border: "none",
              fontWeight: 600
            }}
          >
            Finalizar Compra
          </Button>
        )}

        <Button
          block
          size="large"
          onClick={onClose}
          style={{
            height: 48,
            borderRadius: 8
          }}
        >
          {items.length === 0 ? "Ir para a loja" : "Continuar comprando"}
        </Button>
      </div>
    </Drawer>
  )
}