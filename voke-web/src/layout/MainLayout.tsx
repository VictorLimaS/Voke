import { Layout } from "antd"
import HeaderBar from "../components/Header/HeaderBar"

const { Content, Footer } = Layout

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <Layout>
      <HeaderBar />

      <Content style={{ padding: "40px" }}>
        {children}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Voke ©2026
      </Footer>
    </Layout>
  )
}