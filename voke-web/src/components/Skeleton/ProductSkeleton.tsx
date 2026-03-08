import { Card, Skeleton } from "antd"

export default function ProductSkeleton() {
  return (
    <Card
      style={{
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
      bodyStyle={{
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6
      }}
      cover={
        <div
          style={{
            width: "100%",
            aspectRatio: "1/1",
            background: "#f6f6f6",
            overflow: "hidden"
          }}
        >
        </div>
      }
    >
      <Skeleton
        active
        title={false}
        paragraph={{
          rows: 2,
          width: ["100%", "60%"]
        }}
      />
    </Card>
  )
}