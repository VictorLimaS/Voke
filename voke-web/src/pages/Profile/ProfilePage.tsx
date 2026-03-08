import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Button,
  Divider,
  Space,
  Spin
} from "antd"

import {
  UserOutlined,
  LogoutOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  HeartOutlined
} from "@ant-design/icons"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCartStore } from "../../store/cartStore"
import { getMe } from "../../services/user.service"
import { getMyAddresses } from "../../services/address"
import { getFavorites } from "../../services/favorites"

const { Title, Text } = Typography

export default function ProfilePage() {

  const navigate = useNavigate()

  const items = useCartStore((state) => state.items)

  const [user, setUser] = useState<any>(null)
  const [addresses, setAddresses] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {

    try {

      const userData = await getMe()
      const addressData = await getMyAddresses()
      const favoritesData = await getFavorites()

      setUser(userData)
      setAddresses(addressData)

      setFavorites(
        favoritesData.map((f: any) => f.product)
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }

  }

  const formatCpf = (cpf: string) => {

    const numbers = cpf.replace(/\D/g, "")

    if (numbers.length !== 11) return cpf

    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`

  }

  const logout = () => {

    localStorage.removeItem("token")

    window.location.href = "/"

  }

  if (loading) {

    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spin size="large" />
      </div>
    )

  }

  return (

    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: "0 20px"
      }}
    >

      <Row gutter={24}>

        <Col xs={24} md={7}>

          <Card style={{ borderRadius: 12 }}>

            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%" }}
            >

              <Avatar size={90} icon={<UserOutlined />} />

              <Title level={4} style={{ marginBottom: 0 }}>
                Meu Perfil
              </Title>

              <Text type="secondary">
                {user?.email}
              </Text>

              {user?.cpf && (

                <Text type="secondary">
                  CPF: {formatCpf(user.cpf)}
                </Text>

              )}

              <Divider />

              <Button
                icon={<LogoutOutlined />}
                danger
                block
                size="large"
                onClick={logout}
              >
                Sair da conta
              </Button>

            </Space>

          </Card>

        </Col>


        <Col xs={24} md={17}>


          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12
            }}
          >

            <Space
              align="center"
              style={{ marginBottom: 20 }}
            >
              <HomeOutlined />
              <Title level={4} style={{ margin: 0 }}>
                Meus Endereços
              </Title>
            </Space>

            {addresses.length === 0 ? (

              <div style={{ textAlign: "center", padding: 20 }}>
                <Text type="secondary">
                  Nenhum endereço cadastrado
                </Text>
              </div>

            ) : (

              <Row gutter={[16, 16]}>

                {addresses.map((address) => (

                  <Col xs={24} md={12} key={address.id}>

                    <Card
                      hoverable
                      style={{ borderRadius: 10 }}
                      actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" />
                      ]}
                    >

                      <Text strong>Endereço</Text>

                      <br />

                      <Text type="secondary">
                        {address.street}, {address.number}
                      </Text>

                      <br />

                      <Text type="secondary">
                        {address.city} - {address.state}
                      </Text>

                      <br />

                      <Text type="secondary">
                        CEP: {address.zip}
                      </Text>

                    </Card>

                  </Col>

                ))}

              </Row>

            )}

          </Card>



          <Card
            style={{
              borderRadius: 12,
              marginBottom: 24
            }}
          >

            <Space
              align="center"
              style={{ marginBottom: 20 }}
            >
              <ShoppingCartOutlined />
              <Title level={4} style={{ margin: 0 }}>
                Itens no Carrinho
              </Title>
            </Space>

            {items.length === 0 ? (

              <div style={{ textAlign: "center", padding: 20 }}>
                <Text type="secondary">
                  Seu carrinho está vazio
                </Text>
              </div>

            ) : (

              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >

                {items.map((item) => (

                  <Card
                    key={item.id}
                    size="small"
                    style={{ borderRadius: 10 }}
                  >

                    <Row align="middle" gutter={16}>

                      <Col>

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

                      </Col>

                      <Col flex="auto">

                        <Text strong>
                          {item.name}
                        </Text>

                        <br />

                        <Text type="secondary">
                          R$ {item.price} × {item.quantity}
                        </Text>

                      </Col>

                    </Row>

                  </Card>

                ))}

              </Space>

            )}

          </Card>


          <Card style={{ borderRadius: 12 }}>

            <Space
              align="center"
              style={{ marginBottom: 20 }}
            >
              <HeartOutlined />
              <Title level={4} style={{ margin: 0 }}>
                Produtos Favoritos
              </Title>
            </Space>

            {favorites.length === 0 ? (

              <div style={{ textAlign: "center", padding: 20 }}>
                <Text type="secondary">
                  Você ainda não favoritou nenhum produto
                </Text>
              </div>

            ) : (

              <Row gutter={[16, 16]}>

                {favorites.map((product) => (

                  <Col xs={24} md={12} key={product.id}>

                    <Card
                      hoverable
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >

                      <Row align="middle" gutter={12}>

                        <Col>

                          <img
                            src={product.mainImage}
                            alt={product.name}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 8
                            }}
                          />

                        </Col>

                        <Col flex="auto">

                          <Text strong>
                            {product.name}
                          </Text>

                          <br />

                          <Text type="secondary">
                            R$ {product.price}
                          </Text>

                        </Col>

                      </Row>

                    </Card>

                  </Col>

                ))}

              </Row>

            )}

          </Card>

        </Col>

      </Row>

    </div>

  )

}