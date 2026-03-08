import { Row, Col, Button, Input } from "antd"
import {
  DeleteOutlined,
  HeartOutlined,
  PlusOutlined,
  MinusOutlined,
  TruckOutlined,
  TagOutlined,
  FireOutlined
} from "@ant-design/icons"
import { useCartStore } from "../../store/cartStore"
import { useAuthStore } from "../../store/authStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increase = useCartStore((state) => state.increaseQuantity)
  const decrease = useCartStore((state) => state.decreaseQuantity)

  const { token } = useAuthStore()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const isEmpty = items.length === 0

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shipping = 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    setLoading(true)

    setTimeout(() => {
      if (!token) {
        navigate("/login")
      } else {
        navigate("/checkout")
      }

      setLoading(false)
    }, 800)
  }

  if (isEmpty) {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "80px 20px",
          textAlign: "center"
        }}
      >
        <FireOutlined
          style={{
            fontSize: 80,
            color: "#999",
            marginBottom: 20
          }}
        />

        <h2 style={{ marginBottom: 10 }}>
          Seu carrinho está vazio
        </h2>

        <p style={{ color: "#666", marginBottom: 30 }}>
          Adicione produtos para continuar sua compra
        </p>

        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/")}
          style={{
            background: "#000",
            border: "none",
            height: 48,
            padding: "0 40px",
            borderRadius: 8
          }}
        >
          Ir para compras
        </Button>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "40px 20px"
      }}
    >
      <Row gutter={40}>
        <Col xs={24} lg={16}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>
            Seu carrinho ({items.length})
          </h1>

          <p style={{ color: "#666", marginBottom: 20 }}>
            Os produtos adicionados ao seu carrinho não estão reservados.
            Finalize a compra para garantir os itens antes que acabem.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 30,
              color: "#2e7d32",
              fontWeight: 500
            }}
          >
            <TruckOutlined />
            Frete grátis para este pedido
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 16,
                marginBottom: 20,
                display: "flex",
                gap: 20,
                position: "relative"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                  display: "flex",
                  gap: 12
                }}
              >
                <HeartOutlined style={{ cursor: "pointer" }} />

                <DeleteOutlined
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: "#ff4d4f", cursor: "pointer" }}
                />
              </div>

              <img
                src={item.mainImage}
                alt={item.name}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 8
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: 8 }}>{item.name}</h3>

                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 15
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
                    icon={<MinusOutlined />}
                    onClick={() => decrease(item.id)}
                  />

                  <span
                    style={{
                      minWidth: 30,
                      textAlign: "center",
                      fontWeight: 500
                    }}
                  >
                    {item.quantity}
                  </span>

                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => increase(item.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </Col>

        <Col xs={24} lg={8}>
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 20,
              position: "sticky",
              top: 20
            }}
          >
            <h2 style={{ marginBottom: 20 }}>Resumo do pedido</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10
              }}
            >
              <span>Produtos</span>

              <span>
                R${" "}
                {subtotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2
                })}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20
              }}
            >
              <span>Entrega</span>
              <span style={{ color: "#2e7d32" }}>Grátis</span>
            </div>

            <div
              style={{
                borderTop: "1px solid #eee",
                paddingTop: 15,
                marginBottom: 20,
                fontSize: 18,
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between"
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

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 20
              }}
            >
              <Input
                prefix={<TagOutlined />}
                placeholder="Cupom de desconto"
              />

              <Button>Aplicar</Button>
            </div>

            <Button
              type="primary"
              block
              size="large"
              loading={loading}
              onClick={handleCheckout}
              style={{
                height: 48,
                borderRadius: 8,
                background: "#000",
                border: "none",
                marginBottom: 20
              }}
            >
              Finalizar compra
            </Button>

            <div>
              <div style={{ marginBottom: 10, fontWeight: 500 }}>
                Métodos de pagamento
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <img src="/cards/visa.svg" alt="Visa" height={26} />
                <img src="/cards/master.svg" alt="Mastercard" height={26} />
                <img src="/cards/elo.svg" alt="Elo" height={26} />
                <img src="/cards/am.svg" alt="American Express" height={26} />
                <img src="/cards/pix.svg" alt="Pix" height={26} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}