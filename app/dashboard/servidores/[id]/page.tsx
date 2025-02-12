import { getServerById } from "@/lib/data"
import { ServerForm } from "../server-form"

export default async function ServerPage({ params }: { params: { id: string } }) {
  const server = params.id === "nuevo" ? null : await getServerById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{server ? "Editar Servidor" : "Nuevo Servidor"}</h1>
      <ServerForm server={server} />
    </div>
  )
}

