import { Skeleton } from "antd"

export default function HeroSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: 420,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 32
      }}
    >
      <Skeleton.Image
        active
        style={{
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  )
}