import { getRazonSocialById } from "@/lib/data"
import { RazonSocialForm } from "../razon-social-form"

export default async function RazonSocialPage({ params }: { params: { id: string } }) {
  const razonSocial = params.id === "nuevo" ? null : await getRazonSocialById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{razonSocial ? "Editar Razón Social" : "Nueva Razón Social"}</h1>
      <RazonSocialForm razonSocial={razonSocial} />
    </div>
  )
}

