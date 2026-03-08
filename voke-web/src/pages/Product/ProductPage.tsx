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
        const exists = favorites.some(
          (f: any) => f.product?.id === id
        )
        setFavorite(exists)
      } catch (error) {
        console.error(error)
      }
    }

    if (id) {
      loadFavorites()
    }
  }, [id])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
  }, [id])

  if (isLoading) return <ProductPageSkeleton />

  if (!product) return <div>Produto não encontrado</div>

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
    if (!product) return
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
              <img
                key={img.id}
                ref={index === 0 ? imageRef : undefined}
                src={img.url}
                alt={product.name}
                style={{
                  width: isMobile ? "80%" : "100%",
                  height: isMobile ? 300 : 350,
                  flexShrink: 0,
                  objectFit: "cover",
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5"
                }}
              />
            ))}
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div
            style={{
              maxWidth: 420,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: isMobile ? "static" : "sticky",
              top: 20,
              padding: isMobile ? "0 20px" : "0"
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: isMobile ? 24 : 28,
                  fontWeight: 600,
                  marginBottom: 8
                }}
              >
                {product.name}
              </h1>

              <span style={{ color: "#666", fontSize: 14 }}>
                Categoria: {product.category?.name}
              </span>
            </div>

            <div
              style={{
                fontSize: 26,
                fontWeight: 700
              }}
            >
              R${" "}
              {product.price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}
            </div>

            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  gap: 10
                }}
              >
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
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: "#000",
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
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    color: favorite ? "red" : undefined
                  }}
                />
              </div>
            )}

            <Collapse
              ghost
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: (
                    <strong style={{ fontSize: 16 }}>
                      Descrição do produto
                    </strong>
                  ),
                  children: (
                    <p style={{ lineHeight: "1.6", color: "#444" }}>
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
            padding: "16px",
            borderTop: "1px solid #eee",
            display: "flex",
            gap: 10,
            zIndex: 1000
          }}
        >
          <Button
            size="large"
            icon={favorite ? <HeartFilled /> : <HeartOutlined />}
            onClick={toggleFavorite}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              color: favorite ? "red" : undefined
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
              height: 48,
              borderRadius: 8,
              backgroundColor: "#000",
              border: "none"
            }}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      )}
    </div>
  )
}