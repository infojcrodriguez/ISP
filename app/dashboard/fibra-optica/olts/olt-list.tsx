import { getOLTs } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function OLTList() {
  const olts = await getOLTs()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>IP</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {olts.map((olt) => (
          <TableRow key={olt.id_olt}>
            <TableCell>{olt.nombre}</TableCell>
            <TableCell>{olt.ip}</TableCell>
            <TableCell>{olt.ubicacion}</TableCell>
            <TableCell>{olt.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/fibra-optica/olts/${olt.id_olt}`}>
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

