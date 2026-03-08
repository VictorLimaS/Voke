import { Button, Radio, Card, Typography } from "antd"
import { useState } from "react"

const { Title, Text } = Typography

export default function ShippingStep({ onNext }: any) {

  const [shipping, setShipping] = useState("normal")

  const options = [
    {
      id: "normal",
      title: "Entrega padrão",
      date: "Chega dia 18",
      price: "Grátis"
    },
    {
      id: "express",
      title: "Entrega expressa",
      date: "Chega dia 15",
      price: "R$ 19,90"
    }
  ]

  return (

    <div
      style={{
        maxWidth: 700,
        margin: "0 auto"
      }}
    >

      <Title level={3}>Opções de entrega</Title>

      <Radio.Group
        value={shipping}
        onChange={(e) => setShipping(e.target.value)}
        style={{ width: "100%" }}
      >

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >

          {options.map((option) => (

            <Card
              key={option.id}
              onClick={() => setShipping(option.id)}
              style={{
                cursor: "pointer",
                border:
                  shipping === option.id
                    ? "2px solid black"
                    : "1px solid #eee",
                borderRadius: 10
              }}
            >

              <Radio value={option.id}>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center"
                  }}
                >

                  <div>

                    <Text strong>
                      {option.title}
                    </Text>

                    <div style={{ color: "#666" }}>
                      {option.date}
                    </div>

                  </div>

                  <Text strong>
                    {option.price}
                  </Text>

                </div>

              </Radio>

            </Card>

          ))}

        </div>

      </Radio.Group>

      <Button
        type="primary"
        size="large"
        onClick={() => onNext()}
        style={{
          marginTop: 30,
          height: 48,
          borderRadius: 8,
          padding: "0 40px"
        }}
      >
        Próximo
      </Button>

    </div>

  )

}