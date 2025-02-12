import { getContractById } from "@/lib/data"
import { ContractForm } from "../contract-form"

export default async function ContractPage({ params }: { params: { id: string } }) {
  const contract = params.id === "nuevo" ? null : await getContractById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{contract ? "Editar Contrato" : "Nuevo Contrato"}</h1>
      <ContractForm contract={contract} />
    </div>
  )
}

