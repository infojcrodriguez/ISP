import { getTickets } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export async function TicketList() {
  const tickets = await getTickets()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Asunto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Prioridad</TableHead>
          <TableHead>Fecha de Creación</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id_ticket}>
            <TableCell>{ticket.id_ticket}</TableCell>
            <TableCell>{ticket.nombre_cliente}</TableCell>
            <TableCell>{ticket.asunto}</TableCell>
            <TableCell>
              <Badge variant={ticket.estado === "Abierto" ? "default" : "secondary"}>{ticket.estado}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  ticket.prioridad === "Alta" ? "destructive" : ticket.prioridad === "Media" ? "default" : "secondary"
                }
              >
                {ticket.prioridad}
              </Badge>
            </TableCell>
            <TableCell>{new Date(ticket.fecha_creacion).toLocaleString()}</TableCell>
            <TableCell>
              <Link href={`/dashboard/mesa-ayuda/${ticket.id_ticket}`}>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

