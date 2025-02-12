import { getClients } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function ClientList() {
  const clients = await getClients()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>DNI</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id_cliente}>
            <TableCell>{client.nombre}</TableCell>
            <TableCell>{client.apellido}</TableCell>
            <TableCell>{client.dni}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/clientes/${client.id_cliente}`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

