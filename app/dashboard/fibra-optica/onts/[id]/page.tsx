import { getONTById } from "@/lib/data"
import { ONTForm } from "../ont-form"

export default async function ONTPage({ params }: { params: { id: string } }) {
  const ont = params.id === "nuevo" ? null : await getONTById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{ont ? "Editar ONT" : "Nueva ONT"}</h1>
      <ONTForm ont={ont} />
    </div>
  )
}

