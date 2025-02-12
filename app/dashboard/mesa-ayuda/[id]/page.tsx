import { getTicketById } from "@/lib/data"
import { TicketForm } from "../ticket-form"

export default async function TicketPage({ params }: { params: { id: string } }) {
  const ticket = params.id === "nuevo" ? null : await getTicketById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{ticket ? "Detalles del Ticket" : "Nuevo Ticket"}</h1>
      <TicketForm ticket={ticket} />
    </div>
  )
}

