import { getParametroById } from "@/lib/data"
import { ParametroForm } from "../parametro-form"

export default async function ParametroPage({ params }: { params: { id: string } }) {
  const parametro = params.id === "nuevo" ? null : await getParametroById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{parametro ? "Editar Parámetro" : "Nuevo Parámetro"}</h1>
      <ParametroForm parametro={parametro} />
    </div>
  )
}

