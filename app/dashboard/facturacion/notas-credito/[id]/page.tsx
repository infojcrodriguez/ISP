import { getNotaCreditoById } from "@/lib/data"
import { NotaCreditoForm } from "../nota-credito-form"

export default async function NotaCreditoPage({ params }: { params: { id: string } }) {
  const notaCredito = params.id === "nuevo" ? null : await getNotaCreditoById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{notaCredito ? "Editar Nota de Crédito" : "Nueva Nota de Crédito"}</h1>
      <NotaCreditoForm notaCredito={notaCredito} />
    </div>
  )
}

