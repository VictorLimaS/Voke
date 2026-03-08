import { Row, Col, Skeleton } from "antd"

export default function ProductPageSkeleton() {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "40px 20px"
      }}
    >
      <Row gutter={40}>
        <Col xs={24} lg={16}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton.Image
                key={i}
                active
                style={{
                  width: "100%",
                  height: 350,
                  borderRadius: 10
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
              gap: 20
            }}
          >
            <Skeleton active paragraph={{ rows: 1 }} title />

            <Skeleton.Button active block style={{ height: 40 }} />

            <Skeleton active paragraph={{ rows: 3 }} title={false} />

            <Skeleton.Button active block style={{ height: 48 }} />
          </div>
        </Col>
      </Row>
    </div>
  )
}