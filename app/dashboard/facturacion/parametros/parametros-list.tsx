import { getParametros } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function ParametrosList() {
  const parametros = await getParametros()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parametros.map((parametro) => (
          <TableRow key={parametro.id_parametro}>
            <TableCell>{parametro.nombre}</TableCell>
            <TableCell>{parametro.valor}</TableCell>
            <TableCell>{parametro.descripcion}</TableCell>
            <TableCell>
              <Link href={`/dashboard/facturacion/parametros/${parametro.id_parametro}`}>
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

