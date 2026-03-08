import { Layout } from "antd"
import HeaderBar from "../components/Header/HeaderBar"
import CartDrawer from "../components/CartDrawer/CartDrawer"
import { useState } from "react"

const { Content, Footer } = Layout

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <Layout>
      <HeaderBar onOpenCart={() => setCartOpen(true)} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Content style={{ padding: "40px" }}>
        {children}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Voke ©2026
      </Footer>
    </Layout>
  )
}