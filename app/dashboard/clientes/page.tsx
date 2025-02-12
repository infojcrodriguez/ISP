import { ClientList } from "./client-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ClientesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/dashboard/clientes/nuevo">
          <Button>Agregar Cliente</Button>
        </Link>
      </div>
      <ClientList />
    </div>
  )
}

