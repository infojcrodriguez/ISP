import { getPrecintoById } from "@/lib/data"
import { PrecintoForm } from "../precinto-form"

export default async function PrecintoPage({ params }: { params: { id: string } }) {
  const precinto = params.id === "nuevo" ? null : await getPrecintoById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{precinto ? "Editar Precinto" : "Nuevo Precinto"}</h1>
      <PrecintoForm precinto={precinto} />
    </div>
  )
}

