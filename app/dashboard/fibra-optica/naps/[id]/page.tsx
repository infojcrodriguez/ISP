import { getNAPById } from "@/lib/data"
import { NAPForm } from "../nap-form"

export default async function NAPPage({ params }: { params: { id: string } }) {
  const nap = params.id === "nuevo" ? null : await getNAPById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{nap ? "Editar NAP" : "Nuevo NAP"}</h1>
      <NAPForm nap={nap} />
    </div>
  )
}

