import { getFacturasEmitidas } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function FacturasEmitidasList() {
  const facturas = await getFacturasEmitidas()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Fecha de Emisión</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facturas.map((factura) => (
          <TableRow key={factura.id_factura}>
            <TableCell>{factura.numero}</TableCell>
            <TableCell>{factura.cliente}</TableCell>
            <TableCell>{new Date(factura.fecha_emision).toLocaleDateString()}</TableCell>
            <TableCell>${factura.total.toFixed(2)}</TableCell>
            <TableCell>{factura.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/facturacion/emitidas/${factura.id_factura}`}>
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

