import { Card, Form, Input, Button, Typography, message } from "antd"
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../../services/auth"
import { useAuthStore } from "../../store/authStore"

const { Title, Text } = Typography

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuthStore()

  const onFinish = async (values: any) => {
    try {
      setLoading(true)

      if (isRegister) {
        await registerUser(values.name, values.email, values.password)

        message.success("Conta criada com sucesso!")

        setIsRegister(false)
        return
      }

      const data = await loginUser(values.email, values.password)

      login(data.token)

      message.success("Login realizado!")

      navigate("/")
    } catch (error) {
      console.error(error)
      message.error("Email ou senha inválidos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 12
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          {isRegister ? "Criar conta" : "Entrar na Voke"}
        </Title>

        <div
          key={isRegister ? "register" : "login"}
          style={{
            animation: "fadeSlide .35s ease"
          }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            {isRegister && (
              <Form.Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: "Digite seu nome" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Seu nome"
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Digite seu email" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="seu@email.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: "Digite sua senha" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Senha"
                size="large"
              />
            </Form.Item>

            {isRegister && (
              <Form.Item
                label="Confirmar senha"
                name="confirm"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Confirme a senha" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject("As senhas não coincidem")
                    }
                  })
                ]}
              >
                <Input.Password size="large" prefix={<LockOutlined />}
                  placeholder="Senha" />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                loading={loading}
              >
                {isRegister ? "Criar conta" : "Entrar"}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div style={{ textAlign: "center" }}>
          {isRegister ? (
            <Text>
              Já tem conta?{" "}
              <a onClick={() => setIsRegister(false)}>Entrar</a>
            </Text>
          ) : (
            <Text>
              Não tem conta?{" "}
              <a onClick={() => setIsRegister(true)}>Criar conta</a>
            </Text>
          )}
        </div>
      </Card>

      <style>
        {`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  )
}