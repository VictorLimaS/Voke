import { Card } from "antd"
import { useNavigate } from "react-router-dom"
import type { Product } from "../../types/Product"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      hoverable
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
      bodyStyle={{
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6
      }}
      cover={
        <div
          style={{
            width: "100%",
            aspectRatio: "1/1",
            background: "#f6f6f6",
            overflow: "hidden"
          }}
        >
          <img
            src={product.mainImage}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      }
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: 36
        }}
      >
        {product.name}
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 600
        }}
      >
        R$ {product.price}
      </div>
    </Card>
  )
}