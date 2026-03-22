import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Row, Col, Button, Collapse, Grid } from "antd"
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined
} from "@ant-design/icons"
import { getProductById } from "../../services/products"
import { addFavorite, removeFavorite, getFavorites } from "../../services/favorites"
import type { Product } from "../../types/Product"
import ProductPageSkeleton from "../../components/Skeleton/ProductPageSkeleton"
import { useCartStore } from "../../store/cartStore"
import { useRef, useState, useEffect } from "react"

const { useBreakpoint } = Grid

export default function ProductPage() {
  const { id } = useParams()
  const screens = useBreakpoint()
  const isMobile = screens.md === false

  const addToCart = useCartStore((state) => state.addToCart)
  const imageRef = useRef<HTMLImageElement>(null)
  const [favorite, setFavorite] = useState(false)

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id
  })

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await getFavorites()
        const exists = favorites.some((f: any) => f.product?.id === id)
        setFavorite(exists)
      } catch (error) {
        console.error(error)
      }
    }
    if (id) loadFavorites()
  }, [id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [id])

  if (isLoading || !product) return <ProductPageSkeleton />

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    
    const img = e.currentTarget.querySelector("img")
    if (img) {
      img.style.transformOrigin = `${x}% ${y}%`
      img.style.transform = "scale(2)"
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img")
    if (img) {
      img.style.transform = "scale(1)"
      img.style.transformOrigin = "center"
    }
  }

  const animateToCart = () => {
    const img = imageRef.current
    const cart = document.querySelector(".cart-icon")
    if (!img || !cart) return

    const imgRect = img.getBoundingClientRect()
    const cartRect = cart.getBoundingClientRect()
    const clone = img.cloneNode(true) as HTMLImageElement

    clone.style.position = "fixed"
    clone.style.left = `${imgRect.left}px`
    clone.style.top = `${imgRect.top}px`
    clone.style.width = `${imgRect.width}px`
    clone.style.height = `${imgRect.height}px`
    clone.style.transition = "all 0.7s cubic-bezier(.4,0,.2,1)"
    clone.style.zIndex = "9999"
    clone.style.pointerEvents = "none"

    document.body.appendChild(clone)

    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left}px`
      clone.style.top = `${cartRect.top}px`
      clone.style.width = "20px"
      clone.style.height = "20px"
      clone.style.opacity = "0.3"
    })

    setTimeout(() => clone.remove(), 700)
  }

  const toggleFavorite = async () => {
    try {
      if (favorite) {
        await removeFavorite(product.id)
        setFavorite(false)
      } else {
        await addFavorite(product.id)
        setFavorite(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const displayImages = [
    { id: "main-feature", url: product.mainImage },
    ...(product.images || []).filter((img) => img.url !== product.mainImage)
  ]

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: isMobile ? "0 0 100px 0" : "40px 20px"
      }}
    >
      <Row gutter={isMobile ? [0, 0] : 40}>
        <Col xs={24} lg={16}>
          <div
            style={{
              display: isMobile ? "flex" : "grid",
              gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
              gap: 16,
              overflowX: isMobile ? "auto" : "visible",
              padding: isMobile ? "20px 16px" : "0",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none"
            }}
          >
            {displayImages.map((img, index) => (
              <div
                key={img.id}
                onMouseMove={!isMobile ? handleMouseMove : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                style={{
                  width: isMobile ? "80%" : "100%",
                  height: isMobile ? 300 : 450,
                  flexShrink: 0,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "#f5f5f5",
                  cursor: "zoom-in",
                  position: "relative"
                }}
              >
                <img
                  ref={index === 0 ? imageRef : undefined}
                  src={img.url}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease-out",
                    pointerEvents: "none"
                  }}
                />
              </div>
            ))}
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div
            style={{
              maxWidth: 420,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              position: isMobile ? "static" : "sticky",
              top: 20,
              padding: isMobile ? "0 20px" : "0"
            }}
          >
            <div>
              <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 600, marginBottom: 8 }}>
                {product.name}
              </h1>
              <span style={{ color: "#888", fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
                {product.category?.name}
              </span>
            </div>

            <div style={{ fontSize: 28, fontWeight: 700 }}>
              R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>

            {!isMobile && (
              <div style={{ display: "flex", gap: 12 }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => {
                    animateToCart()
                    addToCart(product)
                  }}
                  style={{
                    flex: 1,
                    height: 54,
                    borderRadius: 8,
                    backgroundColor: "#000",
                    fontSize: 16,
                    fontWeight: 500,
                    border: "none"
                  }}
                >
                  Adicionar ao carrinho
                </Button>

                <Button
                  size="large"
                  icon={favorite ? <HeartFilled /> : <HeartOutlined />}
                  onClick={toggleFavorite}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 8,
                    color: favorite ? "#ff4d4f" : undefined,
                    borderColor: favorite ? "#ff4d4f" : undefined
                  }}
                />
              </div>
            )}

            <Collapse
              ghost
              defaultActiveKey={["1"]}
              expandIconPosition="end"
              items={[
                {
                  key: "1",
                  label: <strong style={{ fontSize: 16 }}>Descrição do produto</strong>,
                  children: (
                    <p style={{ lineHeight: "1.8", color: "#666", fontSize: 15 }}>
                      {product.description}
                    </p>
                  )
                }
              ]}
            />
          </div>
        </Col>
      </Row>

      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            padding: "16px 20px",
            borderTop: "1px solid #eee",
            display: "flex",
            gap: 12,
            zIndex: 1000,
            boxShadow: "0 -4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <Button
            size="large"
            icon={favorite ? <HeartFilled /> : <HeartOutlined />}
            onClick={toggleFavorite}
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              color: favorite ? "#ff4d4f" : undefined
            }}
          />
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => {
              animateToCart()
              addToCart(product)
            }}
            style={{
              flex: 1,
              height: 50,
              borderRadius: 8,
              backgroundColor: "#000",
              border: "none",
              fontWeight: 600
            }}
          >
            Adicionar
          </Button>
        </div>
      )}
    </div>
  )
}