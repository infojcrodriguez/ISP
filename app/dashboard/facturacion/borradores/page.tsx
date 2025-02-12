import { BorradoresList } from "./borradores-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function BorradoresPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Borradores de Facturas</h1>
        <Link href="/dashboard/facturacion/borradores/nuevo">
          <Button>Nuevo Borrador</Button>
        </Link>
      </div>
      <BorradoresList />
    </div>
  )
}

