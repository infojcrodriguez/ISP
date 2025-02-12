import { getInventoryItemById } from "@/lib/data"
import { InventoryForm } from "../inventory-form"

export default async function InventoryItemPage({ params }: { params: { id: string } }) {
  const item = params.id === "nuevo" ? null : await getInventoryItemById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{item ? "Editar Artículo" : "Nuevo Artículo"}</h1>
      <InventoryForm item={item} />
    </div>
  )
}

