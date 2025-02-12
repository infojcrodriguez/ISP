import { getClientById } from "@/lib/data"
import { ClientForm } from "../client-form"

export default async function ClientPage({ params }: { params: { id: string } }) {
  const client = params.id === "nuevo" ? null : await getClientById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{client ? "Editar Cliente" : "Nuevo Cliente"}</h1>
      <ClientForm client={client} />
    </div>
  )
}

