import { getBorradores } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function BorradoresList() {
  const borradores = await getBorradores()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borradores.map((borrador) => (
          <TableRow key={borrador.id_borrador}>
            <TableCell>{borrador.numero}</TableCell>
            <TableCell>{borrador.cliente}</TableCell>
            <TableCell>{new Date(borrador.fecha).toLocaleDateString()}</TableCell>
            <TableCell>${borrador.total.toFixed(2)}</TableCell>
            <TableCell>
              <Link href={`/dashboard/facturacion/borradores/${borrador.id_borrador}`}>
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

