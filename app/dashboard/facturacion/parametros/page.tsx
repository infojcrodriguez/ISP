import { ParametrosList } from "./parametros-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ParametrosPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Parámetros de Facturación</h1>
        <Link href="/dashboard/facturacion/parametros/nuevo">
          <Button>Nuevo Parámetro</Button>
        </Link>
      </div>
      <ParametrosList />
    </div>
  )
}

