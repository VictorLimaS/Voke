import { Carousel } from "antd"
import { useQuery } from "@tanstack/react-query"
import { getHeroes } from "../../services/heroes"
import type { Hero } from "../../types/Hero"

export default function Hero() {
  const { data: heroes = [], isLoading } = useQuery<Hero[]>({
    queryKey: ["heroes"],
    queryFn: getHeroes,
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: 360,
          borderRadius: 12,
          marginBottom: 24,
          background: "#e5e5e5"
        }}
      />
    )
  }

  return (
    <Carousel autoplay>
      {heroes.map((hero) => (
        <div key={hero.id}>
          <div
            style={{
              height: 360,
              borderRadius: 12,
              overflow: "hidden",
              position: "relative"
            }}
          >
            <img
              src={hero.image}
              alt={hero.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 40,
                color: "#fff"
              }}
            >
              {/* opcional: título */}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  )
}