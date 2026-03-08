import { useState, useEffect } from "react"
import { Row, Col } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"

import ContactStep from "./ContactStep"
import ShippingStep from "./ShippingStep"
import PaymentStep from "./PaymentStep"
import OrderSummary from "../../components/OrderSummary/OrderSummary"

import { getMe } from "../../services/user.service"

export default function CheckoutPage() {

  const navigate = useNavigate()
  const location = useLocation()

  const items = useCartStore((state) => state.items)

  const [step, setStep] = useState(1)
  const [user, setUser] = useState<any>(null)

  const [contactData, setContactData] = useState<any>(() => {

    const saved = localStorage.getItem("checkout_contact")
    return saved ? JSON.parse(saved) : null

  })

  useEffect(() => {

    if (location.pathname === "/checkout/payment") {
      setStep(3)
    }

  }, [location.pathname])

  useEffect(() => {

    if (items.length === 0) {
      navigate("/cart")
    }

  }, [items, navigate])

  useEffect(() => {

    async function loadUser() {

      try {

        const data = await getMe()
        setUser(data)

      } catch (err) {

        console.error(err)

      }

    }

    loadUser()

  }, [])

  const next = (data?: any) => {

    if (data) {

      setContactData(data)
      localStorage.setItem("checkout_contact", JSON.stringify(data))

    }

    const nextStep = step + 1

    setStep(nextStep)

    if (nextStep === 3) {

      navigate("/checkout/payment")

    }

  }

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

          {step === 1 && (

            <ContactStep
              onNext={next}
              user={user}
              initialData={contactData}
            />

          )}

          {step === 2 && (

            <ShippingStep
              onNext={next}
            />

          )}

          {step === 3 && (

            <PaymentStep />

          )}

        </Col>

        <Col xs={24} lg={8}>

          <OrderSummary />

        </Col>

      </Row>

    </div>

  )

}