import { InventoryList } from "./inventory-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function InventarioPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Link href="/dashboard/inventario/nuevo">
          <Button>Nuevo Artículo</Button>
        </Link>
      </div>
      <InventoryList />
    </div>
  )
}

