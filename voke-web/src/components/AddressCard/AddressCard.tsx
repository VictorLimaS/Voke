import { Card } from "antd"

export default function AddressCard({
  address,
  selected,
  onSelect
}: any) {
  return (
    <Card
      onClick={() => onSelect(address)}
      style={{
        marginBottom: 12,
        border: selected ? "2px solid black" : "1px solid #ddd",
        cursor: "pointer"
      }}
    >
      <div>
        <strong>{address.street}, {address.number}</strong>
      </div>

      <div>
        {address.city} - {address.state}
      </div>

      <div>{address.zip}</div>

      <div>{address.country}</div>
    </Card>
  )
}