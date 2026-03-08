import { Row, Col, Typography, Grid } from "antd"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../services/categories"
import CategorySkeleton from "../ProductSkeleton/CategorySkeleton"

const { Title, Text } = Typography
const { useBreakpoint } = Grid

interface Props {
  onSelectCategory: (id: string | null) => void
}

export default function Categories({ onSelectCategory }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  const screens = useBreakpoint()
  const isMobile = screens.md === false

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60
  })

  return (
    <div style={{ margin: "40px 0" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        O QUE VOCÊ BUSCA?
      </Title>

      <Row 
        gutter={isMobile ? [16, 0] : [24, 24]}
        wrap={!isMobile}
        style={{
          flexWrap: isMobile ? "nowrap" : "wrap",
          overflowX: isMobile ? "auto" : "visible",
          paddingBottom: isMobile ? 12 : 0,
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Col xs={8} sm={8} md={6} lg={4} key={i} style={{ flexShrink: 0 }}>
                <CategorySkeleton />
              </Col>
            ))
          : categories.map((cat: any) => {
              const isHover = hovered === cat.id

              return (
                <Col 
                  xs={8} sm={8} md={6} lg={4} 
                  key={cat.id} 
                  style={{ flexShrink: 0 }}
                >
                  <div
                    onClick={() => onSelectCategory(cat.id)}
                    onMouseEnter={() => setHovered(cat.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: 10,
                      borderRadius: 12,
                      background: isHover ? "#fafafa" : "transparent",
                      transition: "all .2s ease"
                    }}
                  >
                    <div
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginBottom: 8,
                        boxShadow: isHover
                          ? "0 4px 12px rgba(0,0,0,0.08)"
                          : "none",
                        transition: "all .2s ease"
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </div>

                    <Text
                      style={{
                        fontSize: 14,
                        color: isHover ? "#000" : "#555",
                        transition: "color .2s ease",
                        textAlign: "center"
                      }}
                    >
                      {cat.name}
                    </Text>
                  </div>
                </Col>
              )
            })}
      </Row>
    </div>
  )
}