import { useState } from "react"
import { Layout, Grid } from "antd"

import HeaderBar from "./components/Header/HeaderBar"
import CartDrawer from "./components/CartDrawer/CartDrawer"
import RoutesApp from "./router/routes"

const { Content } = Layout
const { useBreakpoint } = Grid

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const screens = useBreakpoint()
  
  const isMobile = screens.md === false

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      
      <HeaderBar onOpenCart={() => setCartOpen(true)} />

      <Content
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          marginTop: isMobile ? 60 : 0,
          padding: isMobile ? "0" : "0 16px", 
          minHeight: "100%"
        }}
      >
        <RoutesApp />
      </Content>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

    </Layout>
  )
}