import { ContractList } from "./contract-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ContratosPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contratos</h1>
        <Link href="/dashboard/contratos/nuevo">
          <Button>Nuevo Contrato</Button>
        </Link>
      </div>
      <ContractList />
    </div>
  )
}

