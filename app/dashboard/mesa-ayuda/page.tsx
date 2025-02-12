import { TicketList } from "./ticket-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function MesaAyudaPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mesa de Ayuda</h1>
        <Link href="/dashboard/mesa-ayuda/nuevo">
          <Button>Nuevo Ticket</Button>
        </Link>
      </div>
      <TicketList />
    </div>
  )
}

