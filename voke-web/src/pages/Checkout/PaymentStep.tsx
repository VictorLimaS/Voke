import { Tabs, Input, Button, Card, Typography, Row, Col } from "antd"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

export default function PaymentStep() {

  const navigate = useNavigate()

  const handlePay = () => {
    navigate("/checkout/success")
  }

  return (

    <div
      style={{
        maxWidth: 700,
        margin: "0 auto"
      }}
    >

      <Title level={3}>
        Pagamento
      </Title>

      <Tabs
        defaultActiveKey="pix"
        items={[
          {
            key: "pix",
            label: "Pix",
            children: (

              <Card
                style={{
                  textAlign: "center",
                  borderRadius: 10
                }}
              >

                <Text type="secondary">
                  Escaneie o QR Code para pagar
                </Text>

                <div style={{ margin: "20px 0" }}>

                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pagamento-pix-teste"
                    width={200}
                    alt="QR Code Pix"
                  />

                </div>

                <Text type="secondary">
                  Chave Pix: pagamento-pix-teste
                </Text>

                <br />

                <Button
                  type="primary"
                  size="large"
                  onClick={handlePay}
                  style={{
                    marginTop: 20,
                    height: 48,
                    borderRadius: 8,
                    padding: "0 40px"
                  }}
                >
                  Confirmar pagamento
                </Button>

              </Card>

            )
          },

          {
            key: "card",
            label: "Cartão",
            children: (

              <Card
                style={{
                  borderRadius: 10
                }}
              >

                <Input
                  size="large"
                  placeholder="Número do cartão"
                  style={{ marginBottom: 15 }}
                />

                <Input
                  size="large"
                  placeholder="Nome no cartão"
                  style={{ marginBottom: 15 }}
                />

                <Row gutter={12}>

                  <Col span={12}>
                    <Input
                      size="large"
                      placeholder="Validade (MM/AA)"
                    />
                  </Col>

                  <Col span={12}>
                    <Input
                      size="large"
                      placeholder="CVV"
                    />
                  </Col>

                </Row>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handlePay}
                  style={{
                    marginTop: 20,
                    height: 48,
                    borderRadius: 8
                  }}
                >
                  Pagar
                </Button>

              </Card>

            )
          }
        ]}
      />

    </div>

  )

}