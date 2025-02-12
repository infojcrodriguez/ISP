import { getOrderById } from "@/lib/data"
import { OrderForm } from "../order-form"

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = params.id === "nuevo" ? null : await getOrderById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{order ? "Detalles de Orden" : "Nueva Orden"}</h1>
      <OrderForm order={order} />
    </div>
  )
}

