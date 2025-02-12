import { getOLTById } from "@/lib/data"
import { OLTForm } from "../olt-form"

export default async function OLTPage({ params }: { params: { id: string } }) {
  const olt = params.id === "nuevo" ? null : await getOLTById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{olt ? "Editar OLT" : "Nueva OLT"}</h1>
      <OLTForm olt={olt} />
    </div>
  )
}

