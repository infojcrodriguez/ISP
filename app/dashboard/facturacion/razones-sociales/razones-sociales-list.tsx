import { getRazonesSociales } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function RazonesSocialesList() {
  const razonesSociales = await getRazonesSociales()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>RUC</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {razonesSociales.map((razonSocial) => (
          <TableRow key={razonSocial.id_razon_social}>
            <TableCell>{razonSocial.nombre}</TableCell>
            <TableCell>{razonSocial.ruc}</TableCell>
            <TableCell>{razonSocial.direccion}</TableCell>
            <TableCell>
              <Link href={`/dashboard/facturacion/razones-sociales/${razonSocial.id_razon_social}`}>
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

