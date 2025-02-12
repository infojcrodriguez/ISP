import { getNotasCredito } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function NotasCreditoList() {
  const notasCredito = await getNotasCredito()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Factura Relacionada</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notasCredito.map((nota) => (
          <TableRow key={nota.id_nota_credito}>
            <TableCell>{nota.numero}</TableCell>
            <TableCell>{nota.factura_relacionada}</TableCell>
            <TableCell>{nota.cliente}</TableCell>
            <TableCell>{new Date(nota.fecha).toLocaleDateString()}</TableCell>
            <TableCell>${nota.monto.toFixed(2)}</TableCell>
            <TableCell>
              <Link href={`/dashboard/facturacion/notas-credito/${nota.id_nota_credito}`}>
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

