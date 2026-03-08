import { Divider } from "antd"
import { useCartStore } from "../../store/cartStore"

export default function OrderSummary() {
  const items = useCartStore((state) => state.items)

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shipping = 0
  const total = subtotal + shipping

  return (
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

      {/* LISTA DE PRODUTOS */}
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 16
          }}
        >
          <img
            src={item.mainImage}
            alt={item.name}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 6
            }}
          />

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 14
              }}
            >
              {item.name}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#666"
              }}
            >
              Quantidade: {item.quantity}
            </div>
          </div>

          <div style={{ fontWeight: 500 }}>
            R${" "}
            {(item.price * item.quantity).toLocaleString("pt-BR", {
              minimumFractionDigits: 2
            })}
          </div>
        </div>
      ))}

      <Divider />

      {/* SUBTOTAL */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8
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

      {/* FRETE */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12
        }}
      >
        <span>Entrega</span>

        <span style={{ color: "#2e7d32" }}>
          {shipping === 0 ? "Grátis" : shipping}
        </span>
      </div>

      <Divider />

      {/* TOTAL */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          fontWeight: 600
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
  )
}