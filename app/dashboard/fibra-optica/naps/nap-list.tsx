import { getNAPs } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function NAPList() {
  const naps = await getNAPs()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Capacidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {naps.map((nap) => (
          <TableRow key={nap.id_nap}>
            <TableCell>{nap.nombre}</TableCell>
            <TableCell>{nap.ubicacion}</TableCell>
            <TableCell>{nap.capacidad}</TableCell>
            <TableCell>{nap.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/fibra-optica/naps/${nap.id_nap}`}>
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

