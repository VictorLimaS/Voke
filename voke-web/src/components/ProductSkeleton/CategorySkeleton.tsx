import { Skeleton } from "antd"

export default function CategorySkeleton() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10
      }}
    >
      <Skeleton.Avatar active size={90} shape="circle" />

      <div style={{ width: 80, marginTop: 10 }}>
        <Skeleton active title paragraph={false} />
      </div>
    </div>
  )
}