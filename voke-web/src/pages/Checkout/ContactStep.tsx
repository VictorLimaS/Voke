import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  Spin,
  Checkbox
} from "antd"

import { useEffect, useState } from "react"
import { createAddress, getMyAddresses } from "../../services/address"
import AddressCard from "../../components/AddressCard/AddressCard"

const { Title, Text } = Typography

const estados = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO"
]

export default function ContactStep({ onNext, user }: any) {

  const [form] = Form.useForm()

  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddress, setSelectedAddress] = useState<any>(null)

  const [showForm, setShowForm] = useState(false)

  const [loadingCep, setLoadingCep] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadAddresses()

    if (user?.cpf) {
      form.setFieldValue("cpf", formatCpf(user.cpf))
    }

  }, [])

  async function loadAddresses() {

    try {

      const data = await getMyAddresses()

      setAddresses(data)

      if (data.length === 0) {
        setShowForm(true)
      }

    } catch (err) {

      console.error(err)

    }

  }

  const formatCep = (value: string) => {

    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 5) return numbers

    return numbers.slice(0,5) + "-" + numbers.slice(5,8)

  }

  const formatCpf = (value: string) => {

    const numbers = value.replace(/\D/g, "").slice(0,11)

    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return numbers.slice(0,3) + "." + numbers.slice(3)
    if (numbers.length <= 9) return numbers.slice(0,3) + "." + numbers.slice(3,6) + "." + numbers.slice(6)

    return numbers.slice(0,3) + "." + numbers.slice(3,6) + "." + numbers.slice(6,9) + "-" + numbers.slice(9)

  }

  const validateCPF = (cpf: string) => {

    cpf = cpf.replace(/\D/g, "")

    if (cpf.length !== 11) return false

    if (/^(\d)\1+$/.test(cpf)) return false

    let sum = 0
    let rest

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i-1,i)) * (11 - i)
    }

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cpf.substring(9,10))) return false

    sum = 0

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i-1,i)) * (12 - i)
    }

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cpf.substring(10,11))) return false

    return true

  }

  const fetchCep = async (cep: string) => {

    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) return

    try {

      setLoadingCep(true)

      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await res.json()

      if (!data.erro) {

        form.setFieldsValue({
          street: data.logradouro,
          city: data.localidade,
          state: data.uf
        })

      }

    } catch (err) {

      console.error(err)

    } finally {

      setLoadingCep(false)

    }

  }

  const handleCepChange = (e: any) => {

    const formatted = formatCep(e.target.value)

    form.setFieldValue("zip", formatted)

    if (formatted.replace(/\D/g, "").length === 8) {

      fetchCep(formatted)

    }

  }

  const handleCpfChange = (e: any) => {

    const formatted = formatCpf(e.target.value)

    form.setFieldValue("cpf", formatted)

  }

  const onFinish = async (values: any) => {

    try {

      setSaving(true)

      if (values.cpf) {

        const valid = validateCPF(values.cpf)

        if (!valid) {

          form.setFields([
            {
              name: "cpf",
              errors: ["CPF inválido"]
            }
          ])

          setSaving(false)
          return
        }

      }

      const address = await createAddress(values)

      onNext({
        address,
        email: user?.email
      })

    } catch (err) {

      console.error(err)

    } finally {

      setSaving(false)

    }

  }

  const selectAddress = (address: any) => {

    setSelectedAddress(address)

  }

  const continueWithAddress = () => {

    if (!selectedAddress) return

    onNext({
      address: selectedAddress,
      email: user?.email
    })

  }

  return (

    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 16px"
      }}
    >

      <Title level={3}>Contato</Title>

      <div
        style={{
          marginBottom: 32,
          padding: "16px 20px",
          background: "#f5f5f5",
          borderRadius: 8,
          wordBreak: "break-word"
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: 600 }}>
          {user?.email}
        </Text>
      </div>

      {addresses.length > 0 && !showForm && (

        <div>

          <Title level={4}>Seus endereços</Title>

          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              selected={selectedAddress?.id === addr.id}
              onSelect={selectAddress}
            />
          ))}

          <Button
            type="primary"
            size="large"
            block
            disabled={!selectedAddress}
            onClick={continueWithAddress}
            style={{ marginTop: 20 }}
          >
            Usar este endereço
          </Button>

          <Button
            type="link"
            block
            onClick={() => setShowForm(true)}
            style={{ marginTop: 10 }}
          >
            Adicionar novo endereço
          </Button>

        </div>

      )}

      {showForm && (

        <Form form={form} layout="vertical" onFinish={onFinish}>

          <Title level={4}>Novo endereço</Title>

          <Row gutter={20}>

            <Col xs={24} md={16}>
              <Form.Item label="Rua" name="street" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Número" name="number">
                <Input size="large" />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={20}>

            <Col xs={24} md={8}>
              <Form.Item label="CEP" name="zip" rules={[{ required: true }]}>
                <Input
                  size="large"
                  onChange={handleCepChange}
                  suffix={loadingCep ? <Spin size="small"/> : null}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={16}>
              <Form.Item label="Cidade" name="city" rules={[{ required: true }]}>
                <Input size="large"/>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={20}>

            <Col xs={24} md={12}>
              <Form.Item label="Estado" name="state" rules={[{ required: true }]}>
                <Select
                  size="large"
                  options={estados.map(e => ({ label: e, value: e }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="País" name="country" initialValue="Brasil">
                <Input size="large" disabled/>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={20}>

            <Col xs={24} md={12}>
              <Form.Item label="CPF (opcional)" name="cpf">
                <Input
                  size="large"
                  placeholder="000.000.000-00"
                  onChange={handleCpfChange}
                />
              </Form.Item>
            </Col>

          </Row>

          <Form.Item name="saveCpf" valuePropName="checked">
            <Checkbox>
              Salvar CPF na minha conta
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={saving}
            style={{ marginTop: 20 }}
          >
            Salvar endereço
          </Button>

        </Form>

      )}

    </div>

  )

}