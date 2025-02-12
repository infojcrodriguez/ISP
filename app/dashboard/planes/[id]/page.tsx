import { getPlanById } from "@/lib/data"
import { PlanForm } from "../plan-form"

export default async function PlanPage({ params }: { params: { id: string } }) {
  const plan = params.id === "nuevo" ? null : await getPlanById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{plan ? "Editar Plan" : "Nuevo Plan"}</h1>
      <PlanForm plan={plan} />
    </div>
  )
}

