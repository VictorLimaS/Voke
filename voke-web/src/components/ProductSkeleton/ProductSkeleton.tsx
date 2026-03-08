import { Card, Skeleton } from "antd"

export default function ProductSkeleton() {
  return (
    <Card
      style={{
        borderRadius: 12,
        overflow: "hidden"
      }}
      bodyStyle={{ padding: 16 }}
    >
      <Skeleton.Image
        active
        style={{
          width: "100%",
          height: 200,
          marginBottom: 16
        }}
      />

      <Skeleton active paragraph={{ rows: 2 }} title={false} />
    </Card>
  )
}