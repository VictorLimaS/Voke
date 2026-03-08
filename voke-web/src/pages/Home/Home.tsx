import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Hero from "../../components/Hero/Hero"
import Categories from "../../components/Categories/Categories"
import { Row, Col, Grid } from "antd"
import ProductCard from "../../components/ProductCard/ProductCard"
import ProductSkeleton from "../../components/Skeleton/ProductSkeleton"
import { getProducts } from "../../services/products"
import type { Product } from "../../types/Product"

const { useBreakpoint } = Grid

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const screens = useBreakpoint()
  
  const isMobile = screens.md === false 

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: () => getProducts(selectedCategory || undefined),
    staleTime: 1000 * 60 * 5
  })

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "24px 16px",
        paddingTop: isMobile ? 84 : 24 
      }}
    >
      <Hero />

      <Categories onSelectCategory={setSelectedCategory} />

      <Row gutter={[16, 16]}> 
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Col xs={12} sm={12} md={8} lg={6} key={i}>
                <ProductSkeleton />
              </Col>
            ))
          : products.map((product) => (
              <Col xs={12} sm={12} md={8} lg={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
      </Row>
    </div>
  )
}