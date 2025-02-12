import { getBorradorById } from "@/lib/data"
import { BorradorForm } from "../borrador-form"

export default async function BorradorPage({ params }: { params: { id: string } }) {
  const borrador = params.id === "nuevo" ? null : await getBorradorById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{borrador ? "Editar Borrador" : "Nuevo Borrador"}</h1>
      <BorradorForm borrador={borrador} />
    </div>
  )
}

