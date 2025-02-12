import { getPrecintos } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function PrecintoList() {
  const precintos = await getPrecintos()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {precintos.map((precinto) => (
          <TableRow key={precinto.id_precinto}>
            <TableCell>{precinto.codigo}</TableCell>
            <TableCell>{precinto.tipo}</TableCell>
            <TableCell>{precinto.estado}</TableCell>
            <TableCell>{precinto.ubicacion}</TableCell>
            <TableCell>
              <Link href={`/dashboard/fibra-optica/precintos/${precinto.id_precinto}`}>
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

