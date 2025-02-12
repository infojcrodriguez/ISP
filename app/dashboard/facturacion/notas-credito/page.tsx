import { NotasCreditoList } from "./notas-credito-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function NotasCreditoPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notas de Crédito</h1>
        <Link href="/dashboard/facturacion/notas-credito/nuevo">
          <Button>Nueva Nota de Crédito</Button>
        </Link>
      </div>
      <NotasCreditoList />
    </div>
  )
}

